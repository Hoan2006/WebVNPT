import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/eContractPage.css";
import { useEffect, useState } from "react";

import {
  useRegister
} from "../context/RegisterContext";
import ContactForm from "../components/ContactForm";

function Contract() {
  const [packages, setPackages] =
  useState([]);

const {
  setShowRegister
} = useRegister();

useEffect(() => {

  fetch(
    "http://localhost:5000/econtracts"
  )
    .then(res => res.json())
    .then(data => setPackages(data))
    .catch(err => console.log(err));

}, []);

  return (
    <>
      <Header />
      <Navbar />

      {/* Banner */}
      <section className="banner-image">
      <img src="/hopdongdientu2.jpg" alt="Hợp đồng điện tử VNPT" />
      </section>
      {/* Giới thiệu */}
      <section className="contract-intro">
        <div className="container">

          <div className="section-heading">
            <h2>Hợp Đồng Điện Tử</h2>

            <p>
            VNPT eContract là giải pháp hợp đồng điện tử giúp doanh nghiệp và cá nhân
            thực hiện toàn bộ quy trình khởi tạo, đàm phán, ký kết, lưu trữ và quản lý
            hợp đồng hoàn toàn trực tuyến. Nền tảng giúp rút ngắn thời gian xử lý hồ sơ,
            tiết kiệm chi phí vận hành, nâng cao hiệu quả quản trị và mở rộng cơ hội
            kinh doanh trong môi trường số.
          </p>
          </div>

          <div className="intro-grid">
            
            <div className="intro-card">
              <h3>📝 Ký Hợp Đồng Trực Tuyến</h3>
              <p>
                Ký kết hợp đồng mọi lúc mọi nơi trên máy tính,
                điện thoại hoặc máy tính bảng mà không cần gặp mặt trực tiếp.
              </p>
            </div>

            <div className="intro-card">
              <h3>☁️ Lưu Trữ Điện Tử</h3>
              <p>
                Hợp đồng được lưu trữ tập trung trên nền tảng điện toán đám mây,
                giúp tra cứu nhanh chóng và an toàn.
              </p>
            </div>

            <div className="intro-card">
              <h3>📊 Theo Dõi Trạng Thái</h3>
              <p>
                Quản lý toàn bộ vòng đời hợp đồng, theo dõi tiến độ xử lý,
                ký duyệt và hoàn tất theo thời gian thực.
              </p>
            </div>

            <div className="intro-card">
              <h3>🔐 Tích Hợp Chữ Ký Số</h3>
              <p>
                Kết hợp chữ ký số VNPT CA giúp đảm bảo giá trị pháp lý,
                xác thực danh tính và bảo mật dữ liệu giao dịch.
              </p>
            </div>

          </div>

        </div>
      </section>
      
      {/* Quy trình */}
      <section className="process">

        <div className="container">

          <div className="section-heading">
            <h2>Quy Trình Ký Kết</h2>
          </div>

          <div className="process-grid">

            <div className="step">
              <span>1</span>
              <h3>Tạo hợp đồng điện tử </h3>
            </div>

            <div className="step">
              <span>2</span>
              <h3>Gửi các bên tham gia</h3>
            </div>

            <div className="step">
              <span>3</span>
              <h3>Đàm phán trực tuyến</h3>
            </div>

            <div className="step">
              <span>4</span> 
              <h3>Ký kết hợp đồng</h3>
            </div>

          </div>

        </div>

      </section>

      {/* Lợi ích */}
      <section className="benefits">

        <div className="container">

          <div className="section-heading">
            <h2>Lợi Ích Nổi Bật</h2>
          </div>

          <div className="benefit-grid">

            <div className="benefit-card">

              <h3>
                💰 Tiết Kiệm Chi Phí & Bảo Mật Dữ Liệu
              </h3>

              <p>
                Giảm đáng kể chi phí in ấn, chuyển phát, lưu kho và
                quản lý hồ sơ giấy trong quá trình vận hành doanh nghiệp.
              </p>

              <p>
                Dữ liệu hợp đồng được mã hóa nhiều lớp, xác thực người ký
                và bảo vệ thông tin giao dịch an toàn.
              </p>

            </div>

            <div className="benefit-card">

              <h3>
                ⚡ Ký Kết Nhanh Chóng Mọi Lúc Mọi Nơi
              </h3>

              <p>
                Hoàn tất quy trình ký kết chỉ trong vài phút thông qua
                máy tính, điện thoại hoặc máy tính bảng.
              </p>

              <p>
                Không cần gặp mặt trực tiếp, giúp rút ngắn thời gian xử lý
                hồ sơ và tăng tốc độ kinh doanh.
              </p>

            </div>

            <div className="benefit-card">

              <h3>
                📁 Quản Lý Và Tra Cứu Hợp Đồng Dễ Dàng
              </h3>

              <p>
                Toàn bộ hợp đồng được lưu trữ tập trung trên nền tảng
                điện tử hiện đại và bảo mật.
              </p>

              <p>
                Tìm kiếm, theo dõi trạng thái và quản lý vòng đời hợp đồng
                nhanh chóng chỉ với vài thao tác.
              </p>

            </div>

            <div className="benefit-card">

              <h3>
                🌱 Bảo Vệ Tài Nguyên & Môi Trường
              </h3>

              <p>
                Giảm sử dụng giấy, mực in và các chi phí liên quan đến
                lưu trữ hồ sơ truyền thống.
              </p>

              <p>
                Góp phần xây dựng môi trường làm việc xanh và thúc đẩy
                quá trình chuyển đổi số bền vững.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Bảng giá */}
      <section className="pricing">

        <div className="container">

          <div className="section-heading">
            <h2>Bảng Giá Dịch Vụ</h2>
          </div>

          <div className="pricing-grid">

  {packages.map(item => (

    <div
      key={item._id}
      className={`price-card ${
        item.popular
          ? "popular"
          : ""
      }`}
    >

      <h3>{item.name}</h3>

      <h4>{item.price}</h4>

      <p className="price-desc">
  {item.description}
</p>

<button
  className="register-btn"
  onClick={() => setShowRegister(true)}
>
  {item.buttonText}
</button>

<ul className="feature-list">
  {item.features?.map((feature, index) => (
    <li key={index}>
      {feature}
    </li>
  ))}
</ul>
    </div>

  ))}

</div>

        </div>

      </section>

      {/* FAQ */}
      <section className="faq">

        <div className="container">

          <div className="section-heading">
            <h2>Câu Hỏi Thường Gặp</h2>
          </div>

          <div className="faq-item">
            <h3>Hợp đồng điện tử có giá trị pháp lý không?</h3>
            <p>
              Có. Nếu đáp ứng đầy đủ quy định pháp luật
              và xác thực người ký.
            </p>
          </div>

          <div className="faq-item">
            <h3>Có thể ký trên điện thoại không?</h3>
            <p>Có thể ký trên điện thoại, máy tính bảng hoặc laptop.</p>
          </div>

          <div className="faq-item">
            <h3>Dữ liệu được lưu ở đâu?</h3>
            <p>Trên hệ thống máy chủ bảo mật và sao lưu định kỳ.</p>
          </div>

        </div>

      </section>

      <section className="econtract-contact-section">

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

export default Contract;