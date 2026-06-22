import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  useRegister
} from "../context/RegisterContext";

import "../styles/productDetail.css";

function ProductDetail() {

  const { id } = useParams();

  const {
    setShowRegister
  } = useRegister();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {

    fetch(
      `http://localhost:5000/product/${id}`
    )
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log(err));

  }, [id]);

  if (!product) {

    return (
      <div className="loading">
        Đang tải...
      </div>
    );

  }

  return (
    <>
      <Header />
      <Navbar />

      <div className="product-page">

        <div className="product-top">

          <div className="product-image">

            <img
              src={product.image}
              alt={product.title}
            />

          </div>

          <div className="product-info">

            <h1>
              {product.title}
            </h1>

            <div className="info-card-top">

              <h3>
                Giá cước hàng tháng
              </h3>

              <p>
                <strong>
                  Nội thành:
                </strong>
                {" "}
                {product.cityPrice}
              </p>

              <p>
                <strong>
                  Ngoại thành:
                </strong>
                {" "}
                {product.suburbPrice}
              </p>

            </div>

            <div className="info-card-top">

              <h3>
                Khuyến mãi
              </h3>

              <ul className="promotion-list">
                <li>
                  Tặng 01 tháng cước khi đóng trước 12 tháng
                </li>

                <li>
                  Phí hòa mạng: 300.000 VNĐ
                </li>

                <li>
                  Trang bị Modem WiFi 6 miễn phí cho khách hàng đăng ký mới
                </li>

                <li>
                  Trang bị WiFi Mesh 6 miễn phí
                </li>
              </ul>

            </div>

            <div className="info-card-top">

              <h3>
                Thời gian khuyến mãi
              </h3>

              <p>
                {product.promotionPeriod}
              </p>

            </div>

            <div className="info-card-top">

              <h3>
                Ưu điểm nổi bật
              </h3>

              <ul>

                {product.advantages?.map(
                  (item, index) => (

                    <li key={index}>
                      {item}
                    </li>

                  )
                )}

              </ul>

            </div>

            <div className="info-card-top">

              <h3>
                Phạm vi áp dụng
              </h3>

              <p>

                <strong>
                  Nội thành:
                </strong>

                {" "}

                {product.coverage?.urban?.join(", ")}

              </p>


              <p>

                <strong>
                  Ngoại thành:
                </strong>

                {" "}

                {product.coverage?.suburban?.join(", ")}

              </p>

            </div>

            <button
              className="register-btn"
              onClick={() =>
                setShowRegister(true)
              }
            >
              ĐĂNG KÝ NGAY
            </button>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );

}

export default ProductDetail;