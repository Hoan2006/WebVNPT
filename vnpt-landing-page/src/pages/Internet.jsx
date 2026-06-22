import { useState } from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

import "../styles/internet.css";

function Internet() {

  const [activeTab, setActiveTab] =
    useState("home");

  return (
    <>
      <Header /> 
      <Navbar />

      {/* Banner */}
      <section className="banner-image">
        <img
          src="/internet-banner.jpg"
          alt="Internet VNPT"
        />
      </section>

      {/* Tabs */}
      <section className="internet-tabs">

        <div className="container">

          <div className="tab-buttons">

            <button
              className={
                activeTab === "home"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("home")
              }
            >
              Internet Hộ Gia Đình
            </button>

            <button
              className={
                activeTab === "fiber"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("fiber")
              }
            >
              Internet Cáp Quang
            </button>

            <button
              className={
                activeTab === "leased"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("leased")
              }
            >
              Internet Leased Line
            </button>

          </div>

          {/* TAB 1 */}
          {activeTab === "home" && (
            <div className="tab-content">

              <h2>Internet Hộ Gia Đình</h2>

              <p>
              Internet cáp quang FTTH là giải pháp kết nối
              Internet tốc độ cao dành cho hộ gia đình, căn hộ,
              chung cư và cá nhân có nhu cầu sử dụng Internet
              ổn định để học tập, làm việc và giải trí.
              </p>

              <p>
              Hạ tầng cáp quang hiện đại giúp tốc độ truyền tải
              dữ liệu nhanh hơn nhiều lần so với công nghệ cáp
              đồng truyền thống, đảm bảo trải nghiệm xem phim
              4K, chơi game online, livestream và hội họp trực tuyến.
              </p>

              <div className="highlight-box">
                <strong>Phù hợp cho:</strong>

                <ul>
                  <li>Gia đình sử dụng nhiều thiết bị cùng lúc</li>
                  <li>Học tập và làm việc từ xa</li>
                  <li>Xem Netflix, Youtube 4K</li>
                  <li>Camera giám sát</li>
                  <li>Game Online</li>
                  <li>Smart Home</li>
                </ul>
              </div>

              <div className="price-section">

                <h3>
                  1. Bảng giá khu vực nội thành
                </h3>

                <div className="price-image">
                <img
                    src="/noithanh.png"
                    alt="Bảng giá nội thành"
                />
                </div>
                <h3>
                  2. Bảng giá khu vực ngoại thành
                </h3>

                <div className="price-image">
                <img
                    src="/ngoaithanh.png"
                    alt="Bảng giá Internet ngoại thành"
                />
                </div>

              </div>

            </div>
          )}

          {/* TAB 2 */}
          {activeTab === "fiber" && (
            <div className="tab-content">

              <h2>Internet Cáp Quang Doanh Nghiệp FiberVNN</h2>

              <p>
              FiberVNN Doanh Nghiệp là dịch vụ Internet chuyên dụng
              dành cho doanh nghiệp lớn, doanh nghiệp vừa và nhỏ,
              văn phòng, khách sạn, nhà hàng, cửa hàng kinh doanh.
              </p>

              <p>
              Các gói cước FiberEco, Fiber, FiberVip hướng tới
              các doanh nghiệp có nhu cầu vận hành máy chủ,
              VPN, hệ thống camera, ERP hoặc các ứng dụng
              quan trọng trên môi trường Internet.
              </p>

              <div className="highlight-box">
                <ul>
                  <li>Cam kết băng thông quốc tế tốc độ cao</li>
                  <li>Tốc độ trong nước lên đến 2000 Mbps</li>
                  <li>Miễn phí IP tĩnh IPv4/IPv6</li>
                  <li>Hỗ trợ dự phòng 4G/5G</li>
                  <li>Ổn định 24/7</li>
                </ul>
              </div>

              <div className="price-section">

                <h3>
                  1. GÓI CƯỚC INTERNET CHO DOANH NGHIỆP LỚN (FIBER VNN)
                </h3>

                <div className="price-image">
                <img
                    src="/fiber_lon.png"
                    alt="Bảng giá Internet ngoại thành"
                />
                </div>

                <h3>
                  2. GÓI CƯỚC INTERNET CHO DOANH NGHIỆP VỪA VÀ NHỎ (SME)
                </h3>

                <div className="price-image">
                <img
                    src="/fiber_nho.png"
                    alt="Bảng giá Internet ngoại thành"
                />
                </div>

              </div>

            </div>
          )}

          {/* TAB 3 */}
          {activeTab === "leased" && (
            <div className="tab-content">

              <h2>Internet Leased Line</h2>

              <p>
              Internet Leased Line là dịch vụ kết nối Internet
              trực tiếp dành cho doanh nghiệp có yêu cầu cao về
              băng thông, độ ổn định và tính bảo mật.
              </p>

              <p>
              Khác với Internet FTTH thông thường,
              Leased Line sử dụng đường truyền riêng biệt,
              không chia sẻ với khách hàng khác,
              đảm bảo tốc độ và chất lượng kết nối 24/7.
              </p>

              <div className="highlight-box">
                <strong>Hai hình thức kết nối:</strong>

                <ul>
                  <li>GIA (Global Internet Access)</li>
                  <li>NIX (National Internet Exchange)</li>
                </ul>
              </div>

              <h3 className="section-title">
              Vì sao nên chọn Leased Line?
              </h3>

              <div className="benefit-grid">

                <div className="benefit-card">
                  <h3>Tốc độ cao</h3>
                  <p>
                    Băng thông cam kết 100%,
                    tốc độ từ 1Mbps đến hàng chục Gbps.
                  </p>
                </div>

                <div className="benefit-card">
                  <h3>Đường truyền riêng</h3>
                  <p>
                    Không chia sẻ băng thông với khách hàng khác.
                  </p>
                </div>

                <div className="benefit-card">
                  <h3>Bảo mật cao</h3>
                  <p>
                    Dữ liệu truyền qua kênh riêng biệt.
                  </p>
                </div>

                <div className="benefit-card">
                  <h3>Độ trễ thấp</h3>
                  <p>
                    Kết nối trực tiếp giúp truyền tải dữ liệu nhanh.
                  </p>
                </div>

                <div className="benefit-card">
                  <h3>Độ tin cậy cao</h3>
                  <p>
                    SLA cao, giám sát liên tục 24/7.
                  </p>
                </div>

                <div className="benefit-card">
                  <h3>Linh hoạt</h3>
                  <p>
                    Dễ dàng nâng hạ băng thông theo nhu cầu.
                  </p>
                </div>

              </div>

              <h3 className="section-title">
              So sánh Leased Line và FTTH
              </h3>

              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Tiêu chí</th>
                    <th>Leased Line</th>
                    <th>FTTH</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Băng thông</td>
                    <td>Riêng biệt 100%</td>
                    <td>Chia sẻ</td>
                  </tr>

                  <tr>
                    <td>Độ ổn định</td>
                    <td>Rất cao</td>
                    <td>Trung bình</td>
                  </tr>

                  <tr>
                    <td>IP tĩnh</td>
                    <td>Có</td>
                    <td>Tùy gói</td>
                  </tr>

                  <tr>
                    <td>Độ trễ</td>
                    <td>Rất thấp</td>
                    <td>Thấp</td>
                  </tr>

                  <tr>
                    <td>Chi phí</td>
                    <td>Cao</td>
                    <td>Tiết kiệm</td>
                  </tr>

                  <tr>
                    <td>Đối tượng</td>
                    <td>Doanh nghiệp lớn</td>
                    <td>Hộ gia đình, SME</td>
                  </tr>
                </tbody>
              </table>

            </div>
          )}

        </div>

      </section>

      {/* Form */}
      <section className="internet-contact">

        <div className="container">

          <div className="contact-wrapper">

            <ContactForm />

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Internet;