import { roles } from "./constant";

let id_sequence = 1000;

export default [
  {
    url: '/api/getroles',
    method: 'post',
    response: ({ body: p }) => {
      const map = roles.filter(function (item) {
        let yeah = true;
        const title = decode(p.title);
        const conditions = Number(p.conditions);
        if (title && !item.title.includes(title)) {
          yeah = false;
        }
        if (conditions && item.conditions !== conditions) {
          yeah = false;
        }
        return yeah;
      });
      const r = map.sort(function (a, b) {
        return a.sorts - b.sorts;
      });
      const res = r.slice((p.pageNum - 1) * p.pageSize, p.pageNum * p.pageSize);
      return {
        status: 200,
        data: { list: res, total: map.length },
        message: "success",
      };
    }
  }, {
    url: '/api/getAllRoles',
    method: 'get',
    response: () => {
      return { status: 200, data: roles, message: "success" };
    }
  }, {
    url: '/api/addrole',
    method: 'post',
    response: ({ body: p }) => {
      p.id = ++id_sequence;
  if (!p.menuAndPowers) {
    p.menuAndPowers = [];
  }
  roles.push(p);
  return { status: 200, data: null, message: "success" };
    }
  }, {
    url: '/api/uprole',
    method: 'post',
    response: ({ body: p }) => {
      const oldIndex = roles.findIndex(function (item) {
        return item.id === p.id;
      });
      if (oldIndex !== -1) {
        const news = Object.assign({}, roles[oldIndex], p);
        roles.splice(oldIndex, 1, news);
        return { status: 200, data: null, message: "success" };
      } else {
        return { status: 204, data: null, message: "未找到该条数据" };
      }
    }
  }, {
    url: '/api/delrole',
    method: 'post',
    response: ({ body: p }) => {
      const oldIndex = roles.findIndex(function (item) {
        return item.id === p.id;
      });
      if (oldIndex !== -1) {
        roles.splice(oldIndex, 1);
        return { status: 200, data: null, message: "success" };
      } else {
        return { status: 204, data: null, message: "未找到该条数据" };
      }
    }
  }, {
    url: '/api/findAllPowerByRoleId',
    method: 'post',
    response: ({ body: p }) => {
      const t = roles.find(function (item) {
        return item.id === p.id;
      });
      if (t) {
        const res = t.powers.map(function (item, index) {
          const _menu = menus.find(function (v) {
            return v.id === item.menuId;
          });
          const _powers = item.powers.map(function (v) {
            return powers.find(function (p) {
              return p.id === v;
            });
          });
          _menu.powers = _powers.filter(function (item) {
            return item.conditions === 1;
          });
          return _menu;
        });
        return { status: 200, data: res, message: "success" };
      } else {
        return { status: 204, data: null, message: "未找到该角色" };
      }
    }
  }
]