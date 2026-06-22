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

  const [packages, setPackages] =
  useState([]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {

  fetch(
    "http://localhost:5000/hkds"
  )
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
      {/* INTRO SALES */}
      <section className="intro-section">
  <div className="container">

    <div className="section-header">
      <h2>Giải Pháp Hộ Kinh Doanh VNPT HKD</h2>

      <p className="decision-text">
  <span className="highlight-text">
    Quyết định 3389/QĐ-BTC:
  </span>{" "}
  Những Ảnh Hưởng Quan Trọng Đối Với Hộ, Cá thể kinh doanh
    </p>
        </div>

        <div className="intro-grid">

          <div className="info-card">
      <h3>Hóa Đơn Điện Tử & Chữ Ký Số</h3>

      <p>
        Phát hành hóa đơn điện tử theo đúng quy định của cơ quan thuế,
        ký số nhanh chóng và dễ dàng tra cứu lịch sử giao dịch.
      </p>
    </div>

          <div className="info-card">
      <h3>Quản Lý Bán Hàng & Kết Nối Dữ Liệu</h3>

      <p>
        Theo dõi doanh thu, hàng hóa, khách hàng và đồng bộ dữ liệu
        với cơ quan thuế giúp giảm sai sót khi kê khai.
      </p>
    </div>

        </div>
      </div>
    </section>

          {/* BENEFITS */}
          <section className="benefits-section">

      <div className="container">

        <h2>Tính Năng Nổi Bật</h2>

        <div className="grid-2">

      <div className="benefit-card">

        <h3>
          Quản Lý Bán Hàng & Vận Hành Toàn Diện
        </h3>

        <p>
          - Quản lý bán hàng trên giao diện POS hiện đại,
          hỗ trợ tạo mã vạch, tìm kiếm sản phẩm nhanh
          và hiển thị QR thanh toán thuận tiện.
        </p>

        <p>
          - Theo dõi doanh thu, chi phí, đơn hàng,
          chương trình khuyến mại và hoạt động kinh doanh
          trên một nền tảng duy nhất.
        </p>

        <p>
          - Đồng bộ với sàn thương mại điện tử,
          nhiều thiết bị bán hàng và sử dụng linh hoạt
          trên mọi nền tảng.
        </p>

      </div>

      <div className="benefit-card">

        <h3>
          Hóa Đơn Điện Tử & Chữ Ký Số Tích Hợp
        </h3>

        <p>
          - Lập và phát hành hóa đơn điện tử ngay sau khi
          hoàn tất giao dịch bán hàng.
        </p>

        <p>
          - Tích hợp chữ ký số VNPT giúp ký duyệt hóa đơn
          nhanh chóng, đúng quy định pháp luật.
        </p>

        <p>
          - Dễ dàng tra cứu, lưu trữ và quản lý lịch sử
          hóa đơn trên hệ thống tập trung.
        </p>

      </div>

      <div className="benefit-card">

        <h3>
          Đăng Ký & Kê Khai Thuế Thuận Tiện
        </h3>

        <p>
          - Thực hiện đăng ký thuế trực tiếp trên hệ thống
          VNPT HKD mà không cần sử dụng thêm phần mềm khác.
        </p>

        <p>
          - Hỗ trợ tổng hợp dữ liệu kinh doanh,
          tự động chuẩn bị thông tin phục vụ kê khai thuế.
        </p>

        <p>
          - Gửi dữ liệu lên cơ quan thuế nhanh chóng,
          giảm sai sót và tiết kiệm thời gian xử lý.
        </p>

      </div>

    </div>

  </div>

</section>

      {/* PRICING */}
<section className="promotion-section">

  <div className="container">

    <h2>Ưu Đãi Hiện Có</h2>

    <p className="promo-desc">
      Ưu đãi đến hết 31/12/2026 - Khách hàng lần đầu đăng ký ứng dụng
      Hộ, Cá thể kinh doanh VNPT HKD sẽ được những ưu đãi đặc biệt sau:
    </p>

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

      <section className="pricing-section">

  <div className="container">

    <h2>Bảng Giá Dịch Vụ</h2>

    <div className="grid-3">

      {packages.map((item) => (

        <div
          key={item._id}
          className={`price-card ${
            item.featured
              ? "featured"
              : ""
          }`}
        >

          <h3>
            {item.title}
          </h3>

          <span>
            {item.price}
          </span>

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