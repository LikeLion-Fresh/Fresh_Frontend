/* src/membership/m-page.js */
import React from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import "./m-page.css";

function MembershipPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="content">
        <div className="notice-box">
          접근할 수 없는 페이지입니다.
          <div className="button-container">
            <button className="subscribe-button-main">구독하기</button>
            <button className="home-button" onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MembershipPage;
