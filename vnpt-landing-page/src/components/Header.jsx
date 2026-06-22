import { useRegister } from "../context/RegisterContext";
import "../styles/header.css";

function Header() {
  const { setShowRegister } = useRegister();

  return (
    <header className="top-header">
      <div className="container header-content">

        <div className="header-logo">
          <img
            src="/vnpt.jpg"
            alt="VNPT"
            className="logo-image"
          />
        </div>

        <div className="header-right">

          <a
            href="mailto:trankhaihoan111@gmail.com"
            className="header-info"
          >
            <strong>Email:</strong>
            <span>trankhaihoan111@gmail.com</span>
          </a>

          <a
            href="tel:0848200947"
            className="header-info"
          >
            <strong>Hotline:</strong>
            <span>084 820 0947</span>
          </a>

          <button
            className="register-btn"
            onClick={() => setShowRegister(true)}
          >
            Đăng ký ngay
          </button>

        </div>

      </div>
    </header>
  );
}

export default Header;