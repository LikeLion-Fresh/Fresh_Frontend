/*src/login/loginpage.js*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import UserInput from "./UserInput";
import "./loginpage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ id: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleLogin = (platform) => {
    try {
      console.log(`${platform}으로 로그인 시도 중...`);
      const url = `${
        process.env.REACT_APP_KAKAO_LOGIN_URL
      }/api/v1/auth/${platform.toLowerCase()}`;
      window.location.href = url;
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("로그인 정보:", userInfo);
    // 실제 로그인 처리 로직을 여기에 추가합니다.
  };

  return (
    <div className="login-page">
      <Header />
      <div className="content">
        <Sidebar />
        <div className="login-box">
          <a href={"https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fscope%3Dprofile_nickname%2520account_email%26response_type%3Dcode%26state%3DxL964a9xNZP2LOBRCS1qsK2lHlZPgXDtTIaCHHntI8Y%253D%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8080%252Flogin%252Foauth2%252Fcode%252Fkakao%26through_account%3Dtrue%26client_id%3D3fdb5b164925fbbc90d48a8905a17e51"}>
            <img
                src="/Kakao.png"
                alt="Kakao Login"
                className="kakaoimage"
                style={{ cursor: "pointer" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
