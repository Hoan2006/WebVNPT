import { useState } from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/chuKySo.css";
import ContactForm from "../components/ContactForm";

function ChuKySo() {
  return (
    <>
      <Header />
      <Navbar />

      {/* Banner */}
      <section className="banner-image">
        <img src="/chukyso.jpg" alt="Chữ ký số VNPT" />
      </section>

      {/* Intro */}
      <section className="page-section">
        <div className="container">
          <div className="section-title">
            <h2>Chữ Ký Số VNPT-CA Là Gì?</h2>
          </div>

          <div className="intro-content">
           <p>
              VNPT-CA là dịch vụ chứng thực chữ ký số công cộng
              do Tập đoàn VNPT cung cấp, giúp doanh nghiệp,
              hộ kinh doanh và cá nhân thực hiện các giao dịch
              điện tử một cách hợp pháp, an toàn và bảo mật.
            </p>

            <p>
              Chữ ký số VNPT-CA được sử dụng rộng rãi trong kê khai
              thuế điện tử, hóa đơn điện tử, bảo hiểm xã hội,
              hải quan điện tử, hợp đồng điện tử và các giao dịch
              trực tuyến khác.
            </p>

            <p>
              Với hạ tầng hiện đại cùng đội ngũ hỗ trợ chuyên nghiệp,
              VNPT-CA là một trong những nhà cung cấp chữ ký số uy tín
              hàng đầu tại Việt Nam.
            </p>
          </div>
        </div>
      </section>

      {/* Bảng giá dịch vụ */}
      <section className="page-section gray">
        <div className="container">
          <div className="section-title">
            <h2>Bảng Giá Dịch Vụ Chữ Ký Số</h2>
          </div>

          <div className="price-image">
            <img
              src="/chukysodangkymoi.jpg"
              alt="Bảng giá chữ ký số"
            />
          </div>
        </div>
      </section>

      {/* Bảng giá gia hạn */}
      <section className="page-section">
        <div className="container">
          <div className="section-title">
            <h2>Bảng Giá Gia Hạn Dịch Vụ Chữ Ký Số</h2>
          </div>

          <div className="price-image">
            <img
              src="/chukysogiahan1.jpg"
              alt="Bảng giá gia hạn chữ ký số"
            />
          </div>
        </div>
      </section>

      {/* BENEFITS - FIXED MODERN CARD */}
      <section className="page-section gray">
        <div className="container">
          <div className="section-title">
            <h2>Lợi Ích Khi Sử Dụng VNPT-CA</h2>
          </div>

          <div className="benefit-grid modern-grid">

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">01</span>
                <h3>Ký số mọi lúc mọi nơi</h3>
              </div>
              <p>
                Thực hiện giao dịch trực tuyến nhanh chóng bằng phương tiện điện tử, không giới hạn thời gian và địa điểm.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">02</span>
                <h3>Tiết kiệm thời gian</h3>
              </div>
              <p>
                Không cần in ấn, ký tay hay đi lại nộp hồ sơ, giúp tối ưu quy trình làm việc.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">03</span>
                <h3>Bảo mật cao</h3>
              </div>
              <p>
                Công nghệ mã hóa hiện đại đảm bảo an toàn dữ liệu và chống giả mạo.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">04</span>
                <h3>Hợp pháp</h3>
              </div>
              <p>
                Được pháp luật Việt Nam công nhận giá trị pháp lý trong giao dịch điện tử.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">05</span>
                <h3>Tích hợp dễ dàng</h3>
              </div>
              <p>
                Hỗ trợ thuế, BHXH, hóa đơn điện tử và hải quan trên cùng hệ thống.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">06</span>
                <h3>Hỗ trợ 24/7</h3>
              </div>
              <p>
                Đội ngũ VNPT hỗ trợ nhanh chóng, đảm bảo hệ thống luôn ổn định.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="chu-ky-contact-section">
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

export default ChuKySo;