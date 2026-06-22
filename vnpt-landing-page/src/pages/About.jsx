import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/about.css";

function About() {
  return (
    <>
      <Header />
      <Navbar />

      <section className="about-hero">

        <div className="container">

          <h1>Kênh Đăng Ký Dịch Vụ VNPT TP.HCM</h1>

          <p>
            Băng thông quốc tế lớn – Độ ổn định vượt trội –
            Bảo mật tối đa.
          </p>

        </div>

      </section>

      <section className="stats">

        <div className="container stats-grid">

          <div className="stat-box">
            <h2>45 Triệu</h2>
            <p>Khách hàng</p>
          </div>

          <div className="stat-box">
            <h2>7 Triệu</h2>
            <p>Thuê bao Internet</p>
          </div>

          <div className="stat-box">
            <h2>890</h2>
            <p>Điểm giao dịch</p>
          </div>

          <div className="stat-box">
            <h2>45.000</h2>
            <p>Nhân viên</p>
          </div>

        </div>

      </section>

      <section className="about-content">

        <div className="container">

          <h2>Giới thiệu</h2>

          <p>
            Trong kỷ nguyên số, một đường truyền mạng chậm trễ
            hay hệ thống quản trị lỗi thời có thể làm chậm nhịp
            phát triển của bạn.
          </p>

          <p>
            Đội ngũ hỗ trợ kinh doanh VNPT TP.HCM cung cấp các
            giải pháp viễn thông và công nghệ thông tin hiện đại
            dành cho cá nhân, hộ gia đình và doanh nghiệp.
          </p>

        </div>

      </section>

      <section className="service-system">

        <div className="container">

          <h2>Hệ Sinh Thái Dịch Vụ VNPT</h2>

          <div className="service-wrap">

            <div className="service-box">

              <h3>Dành cho Cá nhân & Hộ gia đình</h3>

              <ul>
                <li>Cáp quang FiberVNN</li>
                <li>Home Combo</li>
                <li>Truyền hình MyTV</li>
                <li>Di động VinaPhone</li>
              </ul>

            </div>

            <div className="service-box">

              <h3>Dành cho Doanh nghiệp</h3>

              <ul>
                <li>Leased Line</li>
                <li>VPN/MPLS</li>
                <li>SmartCA</li>
                <li>Hóa đơn điện tử</li>
                <li>VNPT HIS</li>
                <li>vnEdu</li>
              </ul>

            </div>

          </div>

        </div>

      </section>

      <section className="commitment">

        <div className="container">

          <h2>Cam Kết Từ Đội Ngũ Hỗ Trợ</h2>

          <div className="commit-grid">

            <div className="commit-card">
              <h3>Bảo lưu ưu đãi</h3>
              <p>Giữ nguyên chính sách khuyến mãi.</p>
            </div>

            <div className="commit-card">
              <h3>Linh hoạt nhu cầu</h3>
              <p>Hỗ trợ chuyển đổi gói cước.</p>
            </div>

            <div className="commit-card">
              <h3>Thiết bị cao cấp</h3>
              <p>Modem Wifi thế hệ mới.</p>
            </div>

            <div className="commit-card">
              <h3>Chăm sóc 24/7</h3>
              <p>Tổng đài miễn phí 18001166.</p>
            </div>

          </div>

        </div>

      </section>

      <section className="contact-info">

        <div className="container">

          <h2>Thông Tin Liên Hệ</h2>

          <div className="contact-card">

            <h3>Trần Khải Hoàn</h3>

            <p>Đơn vị: VNPT TP.HCM</p>

            <p>Email: trankhaihoan111@gmail.com</p>

            <p>Mã nhân viên: </p>

            <p>Số điện thoại: 0848.200.927</p>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default About;