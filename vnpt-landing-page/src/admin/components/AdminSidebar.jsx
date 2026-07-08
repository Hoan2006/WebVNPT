import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "../styles/sidebar.css";

const AdminSidebar = () => {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/admin/login");

  };

  return (

    <aside className="sidebar">

      <div className="sidebar-logo">

        <img
          src="/vnpt.png"
          alt="VNPT"
        />

        <h3>
          VNPT ADMIN
        </h3>

      </div>

      <nav className="sidebar-menu">

        <NavLink to="/admin/dashboard">
          📊 Dashboard
        </NavLink>

        <NavLink to="/admin/products">
          📦 Gói khuyến mãi
        </NavLink>

        <NavLink to="/admin/services">
          🛠 Dịch vụ
        </NavLink>

        <NavLink to="/admin/news">
          📰 Tin tức
        </NavLink>

        <NavLink to="/admin/econtracts">
          📄 Hợp đồng điện tử
        </NavLink>

        <NavLink to="/admin/hkds">
          🏢 Hộ kinh doanh
        </NavLink>

      </nav>

      <div className="sidebar-footer">

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          🚪 Đăng xuất
        </button>

      </div> 

    </aside>

  );

};

export default AdminSidebar;