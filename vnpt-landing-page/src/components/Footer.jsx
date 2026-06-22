import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="container footer-grid">

          <div className="footer-col">

            <h2 className="footer-logo">
              VNPT TP.HCM
            </h2>

            <p className="footer-desc">
              Cung cấp các giải pháp Internet,
              Chữ ký số, Hợp đồng điện tử và
              Chuyển đổi số dành cho cá nhân
              và doanh nghiệp trên toàn quốc.
            </p>

          </div>

          <div className="footer-col">

            <h3>Liên kết nhanh</h3>

            <ul>

              <li>
                <Link to="/">
                  Trang chủ
                </Link>
              </li>

              <li>
                <Link to="/internet">
                  Dịch vụ Internet
                </Link>
              </li>

              <li>
                <Link to="/e-contract">
                  Hợp đồng điện tử
                </Link>
              </li>

              <li>
                <Link to="/chu-ky-so">
                  Chữ ký số
                </Link>
              </li>

            </ul>

          </div>

          <div className="footer-col">

            <h3>Dịch vụ</h3>

            <ul>

              <li>
                Internet cáp quang
              </li>

              <li>
                Chữ ký số VNPT CA
              </li>

              <li>
                Hợp đồng điện tử
              </li>

              <li>
                Giải pháp hộ kinh doanh
              </li>

            </ul>

          </div>

          <div className="footer-col">

            <h3>Thông tin liên hệ</h3>

            <ul>

              <li>
                📞 0848200927
              </li>

              <li>
                ✉️ trankhaihoan111@gmail.com
              </li>

              <li>
                🕒 Hỗ trợ 24/7
              </li>

              <li>
                📍 TP. Hồ Chí Minh
              </li>

            </ul>

          </div>
 
        </div>

      </div>

      <div className="footer-bottom">

        <div className="container">

          <p>
            © 2026 VNPT TP.HCM.
            All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;