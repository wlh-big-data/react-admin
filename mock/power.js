import { roles } from "./constant";

let id_sequence = 1000;
export default [{
  url: "/api/getpowerbymenuid",
  method: 'get',
  response: ({ body: p }) => {
    const menuId = Number(p.menuId);

  if (menuId) {
    return {
      status: 200,
      data: powers
        .filter(function (item) {
          return item.menu === menuId;
        })
        .sort(function (a, b) {
          return a.sorts - b.sorts;
        }),
      message: "success",
    };
  } else {
    return { status: 200, data: [], message: "success" };
  }
  }
}, {
  url: '/api/addpower',
  method: 'post',
  response: ({ body: p }) => {
    p.id = ++id_sequence;
  powers.push(p);
  return { status: 200, data: { id: p.id }, message: "success" };
  }
}, {
  url: '/api/delpower',
  method: 'post',
  response: ({ body: p }) => {
    const oldIndex = powers.findIndex(function (item) {
      return item.id === p.id;
    });
  
    if (oldIndex !== -1) {
      powers.splice(oldIndex, 1);
      return { status: 200, data: null, message: "success" };
    } else {
      return { status: 204, data: null, message: "未找到该条数据" };
    }
  }
}, {
  url: '/api/uppower',
  method: 'post',
  response: ({ body: p }) => {
    const oldIndex = powers.findIndex(function (item) {
      return item.id === p.id;
    });
    if (oldIndex !== -1) {
      const news = Object.assign({}, powers[oldIndex], p);
      powers.splice(oldIndex, 1, news);
      return { status: 200, data: { id: p.id }, message: "success" };
    } else {
      return { status: 204, data: null, message: "未找到该条数据" };
    }
  }
}, {
  url: '/api/delpower',
  method: 'post',
  // 删除
  response: ({ body: p}) => {
    const oldIndex = powers.findIndex(function (item) {
      return item.id === p.id;
    });
  
    if (oldIndex !== -1) {
      powers.splice(oldIndex, 1);
      return { status: 200, data: null, message: "success" };
    } else {
      return { status: 204, data: null, message: "未找到该条数据" };
    }
  }
}]