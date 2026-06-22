import React from "react";
import AdminLayout from "../components/AdminLayout";
import {
  FaBox,
  FaNewspaper,
  FaUsers,
  FaFileContract,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "../styles/dashboard.css";

const revenueData = [
  { month: "T1", revenue: 120 },
  { month: "T2", revenue: 180 },
  { month: "T3", revenue: 250 },
  { month: "T4", revenue: 220 },
  { month: "T5", revenue: 300 },
  { month: "T6", revenue: 420 },
];

const serviceData = [
  { name: "Internet", value: 45 },
  { name: "MyTV", value: 25 },
  { name: "Di động", value: 20 },
  { name: "Khác", value: 10 },
];

const COLORS = [
  "#0072CE",
  "#00AEEF",
  "#36CFC9",
  "#91D5FF",
];

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="dashboard">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>
            Hệ thống quản trị nội dung VNPT
          </p>
        </div>

        {/* Statistics */}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <FaBox />
            </div>

            <div>
              <h3>Sản phẩm</h3>
              <h2>152</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon cyan">
              <FaUsers />
            </div>

            <div>
              <h3>Khách hàng</h3>
              <h2>4,852</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <FaFileContract />
            </div>

            <div>
              <h3>Hợp đồng</h3>
              <h2>862</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <FaNewspaper />
            </div>

            <div>
              <h3>Tin tức</h3>
              <h2>89</h2>
            </div>
          </div>
        </div>

        {/* Charts */}

        <div className="dashboard-row">
          <div className="chart-card">
            <div className="card-header">
              <h3>Doanh thu 6 tháng gần nhất</h3>
            </div>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0072CE"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="card-header">
              <h3>Tỷ lệ sử dụng dịch vụ</h3>
            </div>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  label
                >
                  {serviceData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}

        <div className="activity-card">
          <div className="card-header">
            <h3>Hoạt động gần đây</h3>
          </div>

          <table className="activity-table">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Người dùng</th>
                <th>Hành động</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>09:15</td>
                <td>admin</td>
                <td>
                  Thêm sản phẩm mới
                </td>
                <td>
                  <span className="success">
                    Thành công
                  </span>
                </td>
              </tr>

              <tr>
                <td>10:30</td>
                <td>editor01</td>
                <td>
                  Cập nhật tin tức
                </td>
                <td>
                  <span className="success">
                    Thành công
                  </span>
                </td>
              </tr>

              <tr>
                <td>11:10</td>
                <td>admin</td>
                <td>
                  Xóa hợp đồng
                </td>
                <td>
                  <span className="warning">
                    Đang xử lý
                  </span>
                </td>
              </tr>

              <tr>
                <td>13:45</td>
                <td>manager</td>
                <td>
                  Thêm khách hàng
                </td>
                <td>
                  <span className="success">
                    Thành công
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;