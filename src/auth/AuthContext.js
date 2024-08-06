/*src/auth/AuthContext.js*/
import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // 사용자 정보를 저장할 수 있는 상태

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
        credentials
      );
      // 로그인 성공 시 사용자 정보와 인증 토큰을 받아옴
      setUser(response.data.user);
      setIsLoggedIn(true);
      // 여기서 로컬 스토리지에 토큰 저장 등의 추가 처리를 할 수 있음
      localStorage.setItem("authToken", response.data.token);
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      // 로그인 실패 시 적절한 처리 (예: 오류 메시지 표시)
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
