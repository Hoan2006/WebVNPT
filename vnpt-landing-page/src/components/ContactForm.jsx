import { useState } from "react";
import "../styles/contactForm.css";

function ContactForm() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
        "Vui lòng nhập họ và tên";
    } else if (!nameRegex.test(name.trim())) {
      newErrors.name =
        "Họ tên chỉ được chứa chữ cái";
    }

    if (!phone.trim()) {
      newErrors.phone =
        "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone =
        "Số điện thoại không hợp lệ";
    }

    if (!email.trim()) {
      newErrors.email =
        "Vui lòng nhập email";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email =
        "Email không đúng định dạng";
    }

    if (!content.trim()) {
      newErrors.content =
        "Vui lòng nhập nội dung tư vấn";
    } else if (content.trim().length < 10) {
      newErrors.content =
        "Nội dung phải từ 10 ký tự trở lên";
    }

    setErrors(newErrors);

    return Object.keys(newErrors)
      .length === 0;
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
            content,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {

        setSuccess(
          "✓ Gửi yêu cầu thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất."
        );

        setName("");
        setPhone("");
        setEmail("");
        setContent("");
        setErrors({});

      } else {

        setErrors({
          server:
            "Không thể gửi yêu cầu. Vui lòng thử lại."
        });

      }

    } catch (error) {

      console.error(error);

      setErrors({
        server:
          "Có lỗi xảy ra khi gửi dữ liệu."
      });

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="contact-form">

      <h2>Yêu Cầu Tư Vấn Ngay</h2>

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {errors.server && (
        <div className="error-message-global">
          {errors.server}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <input
            type="text"
            placeholder="Họ và tên"
            value={name}
            className={
              errors.name
                ? "input-error"
                : ""
            }
            onChange={(e) => {

              setName(
                e.target.value
              );

              setErrors({
                ...errors,
                name: "",
              });

            }}
          />

          {errors.name && (
            <span className="error-text">
              {errors.name}
            </span>
          )}

        </div>

        <div className="form-group">

          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            className={
              errors.phone
                ? "input-error"
                : ""
            }
            onChange={(e) => {

              setPhone(
                e.target.value
              );

              setErrors({
                ...errors,
                phone: "",
              });

            }}
          />

          {errors.phone && (
            <span className="error-text">
              {errors.phone}
            </span>
          )}

        </div>

        <div className="form-group">

          <input
            type="email"
            placeholder="Email"
            value={email}
            className={
              errors.email
                ? "input-error"
                : ""
            }
            onChange={(e) => {

              setEmail(
                e.target.value
              );

              setErrors({
                ...errors,
                email: "",
              });

            }}
          />

          {errors.email && (
            <span className="error-text">
              {errors.email}
            </span>
          )}

        </div>

        <div className="form-group">

          <textarea
            placeholder="Nội dung cần tư vấn"
            value={content}
            className={
              errors.content
                ? "input-error"
                : ""
            }
            onChange={(e) => {

              setContent(
                e.target.value
              );

              setErrors({
                ...errors,
                content: "",
              });

            }}
          />

          {errors.content && (
            <span className="error-text">
              {errors.content}
            </span>
          )}

        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Đang gửi..."
            : "Gửi Yêu Cầu"}
        </button>

      </form>

    </div> 

  );

}

export default ContactForm;