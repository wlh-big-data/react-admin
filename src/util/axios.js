/** 对axios做一些配置 **/

import { baseUrl } from "../config";
import axios from "axios";

/**
 * 根据不同环境设置不同的请求地址
 * 把返回值赋给axios.defaults.baseURL即可
 */
// function setBaseUrl(){
//   switch(process.env.NODE_ENV){
//     case 'development': return 'http://development.com';
//     case 'test': return 'http://test.com';
//     case 'production' : return 'https://production.com';
//     default : return baseUrl;
//   }
// }

const service = axios.create({
  // baseURL: '',// 所有的请求地址前缀部分
  timeout: 25000, // 请求超时时间(毫秒)
  withCredentials: true, // 异步请求携带cookie
});

const refreshToken = () => {
  return service.request({ url: "/api/refreshToken" });
};

const isRefreshRequest = (config) => {
  return config.url === "/api/refreshToken";
};

// 默认基础请求地址
service.defaults.baseURL = baseUrl;
// 请求是否带上cookie
service.defaults.withCredentials = false;
let isRefreshing = false;
let requests = []; // 请求队列
// 对返回的结果做处理
service.interceptors.response.use((response) => {
  const res = response.data;
  if (res.status == 401 && !isRefreshRequest(response.config)) {
    // 如果没有权限且不是刷新token的请求
    if (!isRefreshing) {
      isRefreshing = true;
      // 刷新token
      refreshToken()
        .then((res) => {
          // 保存新的token
          localStorage.setItem("token", res.data.token);
          // 有新token后再重新请求
          response.config.headers.token = localStorage.getItem("token"); // 新token

          // token 刷新后将数组的方法重新执行
          requests.forEach((cb) => cb(res.data.token));
          requests = []; // 重新请求完清空

          return service.request(response.config);
        })
        .catch(() => {
          localStorage.clear(); // 清除token
          // router.replace("/login"); // 跳转到登录页
        })
        .finally(() => {
          isRefreshing = false;
        });
    } else {
      // 返回未执行 resolve 的 Promise
      return new Promise((resolve) => {
        // 用函数形式将 resolve 存入，等待刷新后再执行
        requests.push((token) => {
          response.config.headers.token = `${token}`;
          resolve(service(response.config));
        });
      });
    }
  }
  return response.data;
});

export default service;
