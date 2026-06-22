import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

import "../styles/contactPage.css";

function Contact() {
  return (
    <>
      <Header />
      <Navbar />

      <section className="banner-image">
        <img
          src="/lienhe.jpg"
          alt="Hợp đồng điện tử VNPT"
        />
      </section>

      <section className="contact-page">

        <div className="container">

          <div className="contact-title">

            <h1>LIÊN HỆ VỚI CHÚNG TÔI</h1>

            <p>
              Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc,
              tư vấn giải pháp phù hợp và hỗ trợ doanh nghiệp
              triển khai dịch vụ nhanh chóng.
            </p>

          </div>

          <div className="contact-grid">

            {/* FORM */}
            <ContactForm />

            {/* THÔNG TIN */}
            <div className="contact-info">

              <div className="info-card">

                <div className="info-icon">
                  🏢
                </div>

                <div className="info-content">

                  <h3>VNPT TP.HCM</h3>

                  <p>
                    125 Hai Bà Trưng, Phường Sài Gòn,
                    Thành phố Hồ Chí Minh
                  </p>

                </div>

              </div>

              <div className="info-card">

                <div className="info-icon">
                  📞
                </div>

                <div className="info-content">

                  <h3>Hotline</h3>

                  <p>084 820 0947</p>

                </div>

              </div>

              <div className="info-card">

                <div className="info-icon">
                  ☎️
                </div>

                <div className="info-content">

                  <h3>Tổng đài</h3>

                  <p>18001166</p>

                </div>

              </div>

              <div className="info-card">

                <div className="info-icon">
                  📧
                </div>

                <div className="info-content">

                  <h3>Email</h3>

                  <p>
                    trankhaihoan111@gmail.com
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Contact;