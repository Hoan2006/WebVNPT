import { useState, useEffect } from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/hoKinhDoanh.css";
import { FaGift } from "react-icons/fa";
import ContactForm from "../components/ContactForm";

function HoKinhDoanh() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    taxCode: "",
    address: "",
    content: "",
  });

  const [packages, setPackages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch("http://localhost:5000/hkds")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Gửi thành công!");
      setForm({
        name: "",
        phone: "",
        taxCode: "",
        address: "",
        content: "",
      });
    } else {
      alert("Lỗi gửi dữ liệu!");
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      {/* BANNER IMAGE ONLY */}
      <section className="banner-image">
        <img src="/hokinhdoanh3.jpg" alt="Hộ kinh doanh VNPT" />
      </section>

      {/* INTRO */}
      <section className="page-section">
        <div className="container">
          <div className="section-title">
            <h2>Giải Pháp Hộ Kinh Doanh VNPT HKD</h2>
            <p className="decision-text">
              <span className="highlight-text">Quyết định 3389/QĐ-BTC:</span>{" "}
              Những ảnh hưởng quan trọng đối với hộ, cá thể kinh doanh
            </p>
          </div>

          <div className="intro-grid">
            <div className="info-card">
              <div className="card-head">
                <span className="badge">01</span>
                <h3>Hóa Đơn Điện Tử &amp; Chữ Ký Số</h3>
              </div>
              <p>
                Phát hành hóa đơn điện tử theo đúng quy định của cơ quan
                thuế, ký số nhanh chóng và dễ dàng tra cứu lịch sử giao
                dịch.
              </p>
            </div>

            <div className="info-card">
              <div className="card-head">
                <span className="badge">02</span>
                <h3>Quản Lý Bán Hàng &amp; Kết Nối Dữ Liệu</h3>
              </div>
              <p>
                Theo dõi doanh thu, hàng hóa, khách hàng và đồng bộ dữ liệu
                với cơ quan thuế giúp giảm sai sót khi kê khai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="page-section gray">
        <div className="container">
          <div className="section-title">
            <h2>Tính Năng Nổi Bật</h2>
          </div>

          <div className="benefit-grid modern-grid">
            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">01</span>
                <h3>Quản Lý Bán Hàng Toàn Diện</h3>
              </div>
              <p>
                Giao diện POS hiện đại, hỗ trợ mã vạch, QR thanh toán và
                theo dõi doanh thu, đơn hàng trên một nền tảng duy nhất.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">02</span>
                <h3>Hóa Đơn Điện Tử &amp; Chữ Ký Số</h3>
              </div>
              <p>
                Lập, phát hành và ký duyệt hóa đơn điện tử ngay sau giao
                dịch, tích hợp chữ ký số VNPT đúng quy định pháp luật.
              </p>
            </div>

            <div className="benefit-card modern">
              <div className="card-head">
                <span className="badge">03</span>
                <h3>Đăng Ký &amp; Kê Khai Thuế</h3>
              </div>
              <p>
                Đăng ký thuế và gửi dữ liệu kê khai trực tiếp trên hệ
                thống, giảm sai sót và tiết kiệm thời gian xử lý.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTION */}
      <section className="page-section">
        <div className="container">
          <div className="section-title">
            <h2>Ưu Đãi Hiện Có</h2>
            <p className="promo-desc">
              Ưu đãi đến hết 31/12/2026 - Khách hàng lần đầu đăng ký ứng
              dụng Hộ, Cá thể kinh doanh VNPT HKD sẽ được những ưu đãi đặc
              biệt sau:
            </p>
          </div>

          <div className="grid-3">
            <div className="promo-card">
              <FaGift className="promo-icon" />
              <h3>
                MIỄN PHÍ 6 THÁNG
                <span>phần mềm bán hàng</span>
              </h3>
            </div>

            <div className="promo-card">
              <FaGift className="promo-icon" />
              <h3>
                MIỄN PHÍ 1.000
                <span>hóa đơn điện tử</span>
              </h3>
            </div>

            <div className="promo-card">
              <FaGift className="promo-icon" />
              <h3>
                MIỄN PHÍ 6 THÁNG
                <span>sử dụng chữ ký số</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="page-section gray">
        <div className="container">
          <div className="section-title">
            <h2>Bảng Giá Dịch Vụ</h2>
          </div>

          <div className="grid-3">
            {packages.map((item) => (
              <div
                key={item._id}
                className={`price-card ${item.featured ? "featured" : ""}`}
              >
                {item.featured && <span className="popular-tag">Phổ biến</span>}
                <h3>{item.title}</h3>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="hkd-contact-section">
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

export default HoKinhDoanh;