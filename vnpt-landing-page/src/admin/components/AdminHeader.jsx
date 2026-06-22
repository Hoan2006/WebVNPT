import React from "react";

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div>
        <h2>Hệ thống quản trị VNPT</h2>
      </div>

      <div className="admin-user">
        <img
          src="https://i.pravatar.cc/150"
          alt="admin"
        />

        <div>
          <strong>Admin</strong>
          <p>trankhaihoan111@gmail.com</p>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;