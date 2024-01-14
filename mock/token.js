let i = 0, j = 0;
export default [{
  url: "/api/refreshToken",
  method: 'get',
  response: () => {
    return { status: 200, data: { token: "token" }, message: "success" };
  }
}, {
  url: '/api/user/info',
  response: () => {
    if((i++)%2 === 0) {
      return { status: 401 }
    } else {
      return { status: 200, data: { name: 'admin', roles: ['admin'] }};
  }
}
},{
  url: '/api/user/test',
  response: () => {
    if((j++)%2 === 0) {
      return { status: 401 }
    } else {
      return { status: 200, data: { name: 'admin', roles: ['admin'] }};
  }
}
},]