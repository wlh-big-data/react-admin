import { menus } from "./constant";

// ID序列
let id_sequence = 1000;

export default [
  {
    url: "/api/getmenus",
    method: "get",
    response: () => {
      return { status: 200, data: menus, message: "success" };
    },
  },
  {
    url: "/api/addmenu",
    method: "post",
    response: ({ body: p }) => {
      // const p = JSON.parse(request.body);
      p.id = ++id_sequence;
      menus.push(p);
      return { status: 200, data: menus, message: "添加成功" };
    },
  },
  {
    url: "/api/upmenu",
    method: "post",
    response: ({ body: p }) => {
      const oldIndex = menus.findIndex(function (item) {
        return item.id === p.id;
      });
      if (oldIndex !== -1) {
        const news = Object.assign({}, menus[oldIndex], p);
        menus.splice(oldIndex, 1, news);
        return { status: 200, data: menus, message: "success" };
      } else {
        return { status: 204, data: null, message: "未找到该条数据" };
      }
    },
  },
  {
    url: "/api/delmenu",
    method: "post",
    response: ({ body: p }) => {
      const oldIndex = menus.findIndex(function (item) {
        return item.id === p.id;
      });

      if (oldIndex !== -1) {
        const haveChild = menus.findIndex(function (item) {
          return item.parent === menus[oldIndex].id;
        });
        if (haveChild === -1) {
          menus.splice(oldIndex, 1);
          return { status: 200, data: menus, message: "success" };
        } else {
          return {
            status: 204,
            data: null,
            message: "该菜单下有子菜单，无法删除",
          };
        }
      } else {
        return { status: 204, data: null, message: "未找到该条数据" };
      }
    },
  },
];
