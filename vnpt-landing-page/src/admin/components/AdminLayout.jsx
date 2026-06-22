import React from "react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import "../styles/admin.css";

const AdminLayout = ({ children }) => {

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main">

        <AdminHeader />

        <div className="admin-content">
          {children}
        </div>

      </div>

    </div>
  );

};

export default AdminLayout;