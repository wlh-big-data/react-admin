import { users, menus, roles, powers } from "./constant";

export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body: p }) => {
      const u = users.find(function (item) {
        return item.username === p.username;
      });
      if (!u) {
        return { status: 204, data: null, message: "该用户不存在" };
      } else if (u.password !== p.password) {
        return { status: 204, data: null, message: "密码错误" };
      }
      return { status: 200, data: u, message: "登录成功" };
    },
  },
  {
    url: "/api/getRoleById",
    method: "post",
    response: ({ body: p }) => {
      let res = [];
      if (p.id instanceof Array) {
        res = roles.filter(function (item) {
          return p.id.includes(item.id);
        });
      } else {
        const t = roles.find(function (item) {
          return item.id === p.id;
        });
        res.push(t);
      }
      return { status: 200, data: res, message: "success" };
    },
  },
  {
    url: "/api/getMenusById",
    method: "post",
    response: ({ body: p }) => {
      let res = [];
      if (p.id instanceof Array) {
        res = menus.filter(function (item) {
          return p.id.includes(item.id);
        });
      } else {
        const t = menus.find(function (item) {
          return item.id === p.id;
        });
        res.push(t);
      }
      return { status: 200, data: res, message: "success" };
    },
  },
  {
    url: "/api/getPowerById",
    method: "post",
    response: ({ body: p }) => {
      // const p = JSON.parse(request.body);
      let res = [];
      if (p.id instanceof Array) {
        res = powers.filter(function (item) {
          return p.id.includes(item.id);
        });
      } else {
        const t = powers.find(function (item) {
          return item.id === p.id;
        });
        res.push(t);
      }
      return { status: 200, data: res, message: "success" };
    },
  },
];
