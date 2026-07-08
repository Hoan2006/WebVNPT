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

      <section className="problem-section">
        <div className="container">

          <div className="section-heading">
            <h2>⚠️ Doanh Nghiệp Đang Gặp Những Vấn Đề Này?</h2>
          </div>

          <div className="problem-grid">

            <div className="problem-card">
              <h3>Mất nhiều ngày để hoàn tất hợp đồng</h3>

              <p>
                In ấn → Ký tay → Chuyển phát →
                Chờ đối tác ký → Lưu trữ.
              </p>

              <p>
                Một hợp đồng có thể mất từ
                3 - 7 ngày mới hoàn tất.
              </p>
            </div>

            <div className="problem-card">
              <h3>Chi phí vận hành tăng cao</h3>

              <ul>
                <li>Chi phí in ấn</li>
                <li>Chi phí chuyển phát</li>
                <li>Chi phí lưu kho hồ sơ</li>
                <li>Nhân sự quản lý giấy tờ</li>
              </ul>
            </div>

            <div className="problem-card">
              <h3>Khó kiểm soát hợp đồng</h3>

              <ul>
                <li>Thất lạc hồ sơ</li>
                <li>Không biết đã ký chưa</li>
                <li>Khó tìm kiếm đối chiếu</li>
              </ul>
            </div>

          </div>

          <div className="problem-note">
            📍 Ký kết với khách hàng ở xa khiến quá trình
            xử lý kéo dài và ảnh hưởng tiến độ kinh doanh.
          </div>

        </div>
      </section>

      <section className="solution-section">

        <div className="container">

          <div className="section-heading">
            <h2>Giải Pháp Hợp Đồng Điện Tử VNPT eContract</h2>

            <p>
              Số hóa toàn bộ quy trình ký kết và quản lý
              hợp đồng trên một nền tảng duy nhất.
            </p>
          </div>

          <div className="benefit-grid">

            <div className="benefit-card">
              <h3>📝 Tạo lập hợp đồng điện tử</h3>

              <p>Hợp đồng dịch vụ</p>
              <p>Hợp đồng mua bán</p>
              <p>Hợp đồng nguyên tắc</p>
              <p>Phụ lục hợp đồng</p>
            </div>

            <div className="benefit-card">
              <h3>✍️ Ký số trực tuyến</h3>

              <p>SmartCA</p>
              <p>USB Token</p>
              <p>HSM</p>
              <p>Ký từ xa trên điện thoại</p>
            </div>

            <div className="benefit-card">
              <h3>🔁 Quản lý quy trình phê duyệt</h3>

              <p>Người tạo</p>
              <p>Người duyệt</p>
              <p>Người ký nháy</p>
              <p>Người ký chính thức</p>
            </div>

            <div className="benefit-card">
              <h3>🗂️ Lưu trữ và tra cứu</h3>

              <p>Quản lý tập trung</p>
              <p>Tìm kiếm nhanh</p>
              <p>Theo dõi lịch sử ký</p>
              <p>Lưu trữ an toàn</p>
            </div>

          </div>

        </div>

      </section>

      <section className="labor-section">

        <div className="container">

          <div className="section-heading">
            <h2>Giải Pháp Hợp Đồng Lao Động Điện Tử</h2>
          </div>

          <div className="intro-content">

            <p>
              Số hóa toàn bộ quy trình nhân sự,
              ký hợp đồng lao động từ xa,
              ký phụ lục và gia hạn hợp đồng
              với nhân sự tại nhiều tỉnh thành.
            </p>

            <ul className="labor-list">
              <li>Tuân thủ Nghị định 337/2025/NĐ-CP</li>
              <li>Ký hợp đồng lao động từ xa</li>
              <li>Ký phụ lục hợp đồng</li>
              <li>Gia hạn hợp đồng</li>
              <li>Lưu trữ hồ sơ điện tử tập trung</li>
            </ul>

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

      {/* Quy trình */}
      <section className="process">

        <div className="container">

          <div className="section-heading">
            <h2>Quy Trình Ký Kết Hợp Đồng Điện Tử</h2>
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