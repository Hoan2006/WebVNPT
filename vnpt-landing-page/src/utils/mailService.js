import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_MAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

export const sendContactMail =
  async ({
    name,
    phone,
    email,
    address,
    content,
  }) => {

    /* ==================================
       1. GỬI THÔNG BÁO CHO ADMIN
    ================================== */

    await transporter.sendMail({

      from: `"Website VNPT" <${process.env.AUTH_MAIL}>`,

      to: process.env.AUTH_MAIL,

      replyTo: email,

      subject:
        `📩 Khách hàng mới: ${name}`,

      html: `
        <div style="
          font-family:Arial,sans-serif;
          max-width:700px;
          margin:auto;
        ">

          <h2 style="
            color:#0072ce;
          ">
            Có khách hàng gửi yêu cầu tư vấn
          </h2>

          <table
            border="1"
            cellpadding="10"
            style="
              border-collapse:collapse;
              width:100%;
            "
          >

            <tr>
              <td><b>Họ tên</b></td>
              <td>${name}</td>
            </tr>

            <tr>
              <td><b>Số điện thoại</b></td>
              <td>${phone}</td>
            </tr>

            <tr>
              <td><b>Email</b></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td><b>Địa chỉ</b></td>
              <td>${address || "Không có"}</td>
            </tr>

            <tr>
              <td><b>Nội dung</b></td>
              <td>${content}</td>
            </tr>

          </table>

          <br>

          <div style="
            background:#f5f5f5;
            padding:15px;
            border-radius:8px;
          ">
            Bấm Reply để trả lời trực tiếp
            tới khách hàng:
            <b>${email}</b>
          </div>

        </div>
      `,
    });

    /* ==================================
       2. GỬI XÁC NHẬN CHO KHÁCH
    ================================== */

    await transporter.sendMail({

      from: `"VNPT" <${process.env.AUTH_MAIL}>`,

      to: email,

      subject:
        "VNPT đã nhận được yêu cầu tư vấn của bạn",

      html: `
        <div style="
          font-family:Arial,sans-serif;
          max-width:700px;
          margin:auto;
        ">

          <h2 style="
            color:#0072ce;
          ">
            Cảm ơn anh/chị ${name}
          </h2>

          <p>
            Chúng tôi đã nhận được
            yêu cầu tư vấn từ website.
          </p>

          <p>
            Nhân viên VNPT sẽ liên hệ
            với anh/chị trong thời gian
            sớm nhất để hỗ trợ.
          </p>

          <div style="
            background:#f5f5f5;
            padding:15px;
            border-radius:8px;
            margin:20px 0;
          ">

            <b>Thông tin đã gửi:</b>

            <ul>
              <li>
                Số điện thoại:
                ${phone}
              </li>

              <li>
                Email:
                ${email}
              </li>

              <li>
                Địa chỉ:
                ${address || "Không có"}
              </li>
            </ul>

          </div>

          <p>
            Trân trọng,
          </p>

          <p>
            <b>Đội ngũ VNPT</b>
          </p>

        </div>
      `,
    });

    return true;
  };