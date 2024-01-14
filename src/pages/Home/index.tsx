/* 主页 */

import React, { useEffect } from "react";
import ImgLogo from "@/assets/react-logo.jpg";
import axios from "@/util/axios";

import "./index.less";

export default function HomePageContainer(): JSX.Element {
  useEffect(() => {
    console.log("HomePageContainer");
    // axios.get("/api/user/info").then((res) => {});
  }, []);

  return (
    <div className="page-home all_nowarp">
      <div className="box">
        <button
          onClick={() => {
            axios.get("/api/user/info").then((res) => {});
            axios.get("/api/user/test").then((res) => {});
          }}
        >
          发送请求
        </button>
        <img src={ImgLogo} />
        <div className="title">React-admin</div>
        <div className="info">
          标准后台管理系统解决方案，react18、router6、rematch、antd4、vite4、ES6+
        </div>
        <div className="info">动态菜单配置，权限精确到按钮</div>
      </div>
    </div>
  );
}
