import "../styles/registerModal.css";
import { useState } from "react";
import { useRegister } from "../context/RegisterContext";

function RegisterModal() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { showRegister, setShowRegister } =
    useRegister();

  const validateForm = () => {
    const newErrors = {};

    const nameRegex =
      /^[A-Za-zÀ-ỹ\s]{2,50}$/;

    const phoneRegex =
      /^(0[3|5|7|8|9])[0-9]{8}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      newErrors.name =
        "Vui lòng nhập họ tên";
    } else if (
      !nameRegex.test(name.trim())
    ) {
      newErrors.name =
        "Họ tên không hợp lệ";
    }

    if (!phone.trim()) {
      newErrors.phone =
        "Vui lòng nhập số điện thoại";
    } else if (
      !phoneRegex.test(phone.trim())
    ) {
      newErrors.phone =
        "Số điện thoại không hợp lệ";
    }

    if (!email.trim()) {
      newErrors.email =
        "Vui lòng nhập email";
    } else if (
      !emailRegex.test(email.trim())
    ) {
      newErrors.email =
        "Email không hợp lệ";
    }

    if (!address.trim()) {
      newErrors.address =
        "Vui lòng nhập địa chỉ";
    }

    if (!content.trim()) {
      newErrors.content =
        "Vui lòng nhập nội dung";
    } else if (
      content.trim().length < 10
    ) {
      newErrors.content =
        "Nội dung tối thiểu 10 ký tự";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            address,
            content,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setSuccess(
          "✓ Gửi yêu cầu thành công!"
        );

        // reset form
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setContent("");
        setErrors({});
      } else {
        setErrors({
          server:
            data.message ||
            "Không thể gửi yêu cầu",
        });
      }
    } catch (error) {
      console.error(error);

      setErrors({
        server:
          "Có lỗi xảy ra khi gửi dữ liệu",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!showRegister) return null;

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

        <h2>Đăng ký tư vấn</h2>

        {success && (
          <div className="success-box">
            {success}
          </div>
        )}

        {errors.server && (
          <div className="error-box">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            {errors.name && (
              <span className="error-text">
                {errors.name}
              </span>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
            />

            {errors.phone && (
              <span className="error-text">
                {errors.phone}
              </span>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            {errors.email && (
              <span className="error-text">
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
            />

            {errors.address && (
              <span className="error-text">
                {errors.address}
              </span>
            )}
          </div>

          <div>
            <textarea
              rows="4"
              placeholder="Nội dung cần tư vấn"
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
            />

            {errors.content && (
              <span className="error-text">
                {errors.content}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading
              ? "Đang gửi..."
              : "Gửi yêu cầu"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;