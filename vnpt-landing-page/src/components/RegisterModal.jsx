import "../styles/registerModal.css";

import {
  useRegister
} from "../context/RegisterContext";

function RegisterModal() {

  const {
    showRegister,
    setShowRegister
  } = useRegister();

  if (!showRegister)
    return null;

  return (

    <div
      className="modal-overlay"
      onClick={() =>
        setShowRegister(false)
      }
    >

      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <button
          className="close-btn"
          onClick={() =>
            setShowRegister(false)
          }
        >
          ×
        </button>

        <h2>
          Đăng ký tư vấn
        </h2>

        <form>

          <input
            type="text"
            placeholder="Họ và tên"
          />

          <input
            type="tel"
            placeholder="Số điện thoại"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="text"
            placeholder="Địa chỉ"
          />

          <textarea
            rows="4"
            placeholder="Nội dung cần tư vấn"
          />

          <button
            type="submit"
            className="submit-btn"
          >
            Gửi yêu cầu
          </button>

        </form>

      </div>

    </div>

  );

}

export default RegisterModal;