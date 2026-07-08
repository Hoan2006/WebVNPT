import { useState } from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/chuKySo.css";
import ContactForm from "../components/ContactForm";

/* =========================================
   DỮ LIỆU GIÁ - VNPT-CA
========================================= */
const vnptCaData = {
  "doanh-nghiep": {
    label: "Doanh Nghiệp / Tổ Chức",
    desc: "Chữ ký số có giá trị pháp lý như con dấu của tổ chức/doanh nghiệp khi giao dịch điện tử.",
    features: [
      "Hỗ trợ đầy đủ nghiệp vụ ký số",
      "Public key: 2048 bit",
      "Chuẩn: SHA256",
      "Ký văn bản dạng PDF, Word, file ảnh…",
      "Ký hóa đơn điện tử",
      "Thuế điện tử, Hải quan",
      "Bảo hiểm xã hội",
      "Giao dịch điện tử khác",
    ],
    plans: [
      { duration: "12 tháng", price: "1.823.000đ" },
      { duration: "24 tháng", price: "2.740.000đ", popular: true },
      { duration: "36 tháng", price: "3.112.000đ" },
    ],
  },
  "ca-nhan-trong-dn": {
    label: "Cá Nhân Trong Doanh Nghiệp",
    desc: "Chữ ký số có giá trị pháp lý như chữ ký tay của cá nhân trong tổ chức/doanh nghiệp: sử dụng trong các giao dịch nội bộ hoặc giao dịch với bên ngoài được tổ chức/doanh nghiệp ủy quyền.",
    features: [
      "Hỗ trợ đầy đủ nghiệp vụ ký số",
      "Public key: 2048 bit",
      "Chuẩn: SHA256",
      "Ký văn bản dạng PDF, Word, file ảnh…",
      "Ký số (Document Signing)",
      "Bảo vệ Email (Email protect)",
      "Xác thực người dùng (Authentication)",
      "Giao dịch điện tử khác",
    ],
    plans: [
      { duration: "12 tháng", price: "825.000đ" },
      { duration: "24 tháng", price: "1.265.000đ", popular: true },
      { duration: "36 tháng", price: "1.595.000đ" },
    ],
  },
  "ca-nhan": {
    label: "Cá Nhân",
    desc: "Chữ ký số dùng để xác thực danh tính của cá nhân, có giá trị pháp lý như chữ ký tay của cá nhân đó.",
    features: [
      "Hỗ trợ đầy đủ nghiệp vụ ký số",
      "Public key: 2048 bit",
      "Chuẩn: SHA256",
      "Ký văn bản dạng PDF, Word, file ảnh…",
      "Ký số (Document Signing)",
      "Bảo vệ Email (Email protect)",
      "Xác thực người dùng (Authentication)",
      "Giao dịch điện tử khác",
    ],
    plans: [
      { duration: "12 tháng", price: "715.000đ" },
      { duration: "24 tháng", price: "1.155.000đ", popular: true },
      { duration: "36 tháng", price: "1.485.000đ" },
    ],
  },
};

/* =========================================
   DỮ LIỆU GIÁ - VNPT SMARTCA
========================================= */
const smartCaData = {
  "doanh-nghiep": {
    label: "Doanh Nghiệp / Tổ Chức",
    desc: "Chữ ký số có giá trị pháp lý như con dấu của tổ chức/doanh nghiệp khi giao dịch điện tử.",
    features: [
      "Public key: 2048 bit",
      "Chuẩn: RSA-SHA256",
      "Tốc độ ký: 01 lượt ký/giây",
      "Lượt ký tối đa trong 24h: 500 lượt ký",
      "Ký văn bản dạng PDF, Word, file ảnh…",
      "Ký số trên điện thoại di động, tablet…",
    ],
    plans: [
      { duration: "12 tháng", price: "1.273.000đ" },
      { duration: "24 tháng", price: "2.190.000đ", popular: true },
      { duration: "36 tháng", price: "2.912.000đ" },
    ],
  },
  "ca-nhan-trong-dn": {
    label: "Cá Nhân Trong Doanh Nghiệp",
    desc: "Chữ ký số có giá trị pháp lý như chữ ký tay của cá nhân trong tổ chức/doanh nghiệp. Sử dụng trong các giao dịch nội bộ hoặc giao dịch với bên ngoài được tổ chức/doanh nghiệp ủy quyền.",
    features: [
      "Public key: 2048 bit",
      "Chuẩn: RSA-SHA256",
      "Tốc độ ký: 01 lượt ký/giây",
      "Lượt ký tối đa trong 24h: 500 lượt ký",
      "Ký văn bản dạng PDF, Word, file ảnh…",
      "Ký số trên điện thoại di động, tablet…",
    ],
    plans: [
      { duration: "12 tháng", price: "330.000đ" },
      { duration: "24 tháng", price: "605.000đ", popular: true },
      { duration: "36 tháng", price: "770.000đ" },
    ],
  },
  "ca-nhan": {
    label: "Cá Nhân",
    desc: "Chữ ký số dùng để xác thực danh tính của cá nhân, có giá trị pháp lý như chữ ký tay của cá nhân đó.",
    features: [
      "Public key: 2048 bit",
      "Chuẩn: RSA-SHA256",
      "Tốc độ ký: 01 lượt ký/giây",
      "Lượt ký tối đa trong 24h: 500 lượt ký",
      "Ký văn bản dạng PDF, Word, file ảnh…",
      "Ký số trên điện thoại di động, tablet…",
    ],
    plans: [
      { duration: "12 tháng", price: "220.000đ" },
      { duration: "24 tháng", price: "385.000đ", popular: true },
      { duration: "36 tháng", price: "550.000đ" },
    ],
  },
};

/* =========================================
   COMPONENT: BẢNG GIÁ DẠNG TAB
========================================= */
function PricingTabs({ data }) {
  const tabKeys = Object.keys(data);
  const [activeTab, setActiveTab] = useState(tabKeys[0]);
  const current = data[activeTab];

  return (
    <div className="pricing-tabs-wrap">
      {/* Tab buttons */}
      <div className="pricing-tabs">
        {tabKeys.map((key) => (
          <button
            key={key}
            className={`pricing-tab-btn ${activeTab === key ? "active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {data[key].label}
          </button>
        ))}
      </div>

      {/* Description của nhóm đối tượng */}
      <p className="pricing-tab-desc">{current.desc}</p>

      {/* Price cards */}
      <div className="pricing-cards">
        {current.plans.map((plan, idx) => (
          <div
            key={idx}
            className={`pricing-card ${plan.popular ? "popular" : ""}`}
          >
            {plan.popular && <span className="popular-tag">Phổ biến</span>}

            <div className="pricing-duration">{plan.duration}</div>
            <div className="pricing-price">{plan.price}</div>

            <ul className="pricing-features">
              {current.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <button className="pricing-btn">ĐĂNG KÝ</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================
   PAGE: CHỮ KÝ SỐ
========================================= */
function ChuKySo() {
  return (
    <>
      <Header />
      <Navbar />

      {/* Banner */}
      <section className="banner-image">
        <img src="/chukyso.jpg" alt="Chữ ký số VNPT" />
      </section>

      {/* =========================================
          PHẦN 1: VNPT-CA
      ========================================= */}

      {/* Intro VNPT-CA */}
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

      {/* Bảng giá VNPT-CA */}
      <section className="page-section gray">
        <div className="container">
          <div className="section-title">
            <h2>Bảng Giá Dịch Vụ Chữ Ký Số VNPT-CA</h2>
          </div>

          <PricingTabs data={vnptCaData} />
        </div>
      </section>

      {/* BENEFITS VNPT-CA */}
      <section className="page-section">
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

      {/* Divider giữa 2 phần */}
      <div className="section-divider">
        <span>VNPT SMARTCA</span>
      </div>

      {/* =========================================
          PHẦN 2: VNPT SMARTCA
      ========================================= */}

      {/* Intro SmartCA */}
      <section className="page-section">
        <div className="container">
          <div className="section-title">
            <h2>Chữ Ký Số VNPT SmartCA Là Gì?</h2>
          </div>

          <div className="intro-content">
            <p>
              VNPT SmartCA là giải pháp chữ ký số từ xa (Remote Signing)
              thế hệ mới do VNPT phát triển, cho phép ký số ngay trên
              điện thoại thông minh, máy tính bảng mà không cần sử dụng
              USB Token vật lý.
            </p>

            <p>
              Với công nghệ ký số di động, người dùng có thể ký kết
              hợp đồng, hóa đơn, hồ sơ thuế, văn bản điện tử mọi lúc
              mọi nơi chỉ với vài thao tác đơn giản trên ứng dụng
              VNPT SmartCA.
            </p>

            <p>
              VNPT SmartCA đáp ứng đầy đủ tiêu chuẩn bảo mật quốc tế,
              được Bộ Thông tin và Truyền thông cấp phép, đảm bảo giá
              trị pháp lý tương đương chữ ký số truyền thống.
            </p>
          </div>
        </div>
      </section>

      {/* Bảng giá SmartCA */}
      <section className="page-section gray">
        <div className="container">
          <div className="section-title">
            <h2>Bảng Giá Dịch Vụ Chữ Ký Số VNPT SmartCA</h2>
          </div>

          <PricingTabs data={smartCaData} />
        </div>
      </section>

      {/* BENEFITS SmartCA */}
      <section className="page-section">
        <div className="container">
          <div className="section-title">
            <h2>Lợi Ích Khi Sử Dụng VNPT SmartCA</h2>
          </div>

          <div className="benefit-grid modern-grid">
            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">01</span>
                <h3>Không cần Token</h3>
              </div>
              <p>
                Ký số ngay trên điện thoại, không cần mang theo USB Token vật lý.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">02</span>
                <h3>Ký số di động</h3>
              </div>
              <p>
                Ký kết văn bản, hợp đồng mọi lúc mọi nơi chỉ với smartphone có kết nối internet.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">03</span>
                <h3>Xác thực sinh trắc học</h3>
              </div>
              <p>
                Bảo mật bằng vân tay, khuôn mặt giúp chống giả mạo chữ ký hiệu quả.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">04</span>
                <h3>Giá trị pháp lý</h3>
              </div>
              <p>
                Được công nhận pháp lý đầy đủ như chữ ký số truyền thống.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">05</span>
                <h3>Đa nền tảng</h3>
              </div>
              <p>
                Tương thích iOS, Android, tích hợp dễ dàng với các hệ thống hóa đơn, thuế điện tử.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">06</span>
                <h3>Triển khai nhanh</h3>
              </div>
              <p>
                Đăng ký và sử dụng ngay trong ngày, không mất thời gian chờ giao Token.
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