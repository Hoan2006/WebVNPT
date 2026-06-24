import {
  useState
} from "react";

import {
  createProduct,
  updateProduct,
  uploadImage
} from "../../services/productService";
import { toast } from "react-toastify";
import "../styles/productModal.css";

function ProductModal({
  product,
  onClose,
  onSuccess,
}) {

  const [loading, setLoading] =
    useState(false);

  const [imageFile, setImageFile] =
    useState(null);

  const [form, setForm] =
    useState({
      title:
        product?.title || "",

      description:
        product?.description || "",

      price:
        product?.price || "",

      image:
        product?.image || "",

      category:
        product?.category || "",

      cityPrice:
        product?.cityPrice || "",

      suburbPrice:
        product?.suburbPrice || "",

      promotionPeriod:
        product?.promotionPeriod || "",

      promotion:
        product?.promotion?.join(
          "\n"
        ) || "",

      advantages:
        product?.advantages?.join(
          "\n"
        ) || "",

      urbanCoverage:
        product?.coverage?.urban?.join(
          "\n"
        ) || "",

      suburbanCoverage:
        product?.coverage?.suburban?.join(
          "\n"
        ) || "",
    });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleImageChange = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setForm({
      ...form,
      image:
        URL.createObjectURL(file),
    });

  };

  const handleSubmit =
    async () => {

      try {

        setLoading(true);

        let imageUrl =
          form.image;

        if (imageFile) {

          const uploadRes =
            await uploadImage(
              imageFile
            );

          imageUrl =
            uploadRes.data.imageUrl;

        }

        const payload = {
          title: form.title,

          description:
            form.description,
          
          price: form.price,

          image: imageUrl,

          category: "internet-home",

          cityPrice:
            form.cityPrice,

          suburbPrice:
            form.suburbPrice,

          promotionPeriod:
            form.promotionPeriod,

          promotion:
            form.promotion
              .split("\n")
              .filter(Boolean),

          advantages:
            form.advantages
              .split("\n")
              .filter(Boolean),

          coverage: {

            urban:
              form.urbanCoverage
                .split("\n")
                .filter(Boolean),

            suburban:
              form.suburbanCoverage
                .split("\n")
                .filter(Boolean),

          },
        };

        if (product?._id) {

        await updateProduct(
            product._id,
            payload
        );

        toast.success(
        "Cập nhật gói thành công"
        );

        } else {

        await createProduct(
            payload
        );

        toast.success(
        "Thêm gói thành công"
        );

        }

        onSuccess();

      } catch (error) {

        console.log(error);

        toast.error(
            product
            ? "Cập nhật thất bại"
            : "Thêm mới thất bại"
        );

        } finally {

        setLoading(false);

      }

    };

  return (

    <div className="pm-overlay">

      <div className="pm-modal">

        <div className="pm-header">

          <h2>
            {product
              ? "Cập nhật gói"
              : "Thêm gói mới"}
          </h2>

          <button
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="pm-section">

          <h3>
            Thông tin cơ bản
          </h3>

          <div className="pm-grid">

            <div>

              <label>
                Tên gói
              </label>

              <input
                name="title"
                value={form.title}
                onChange={
                  handleChange
                }
              />

            </div>

          </div>

          <label>
            Mô tả
          </label>

          <textarea
            name="description"
            rows="3"
            value={
              form.description
            }
            onChange={
              handleChange
            }
          />

          <label>
            Hình ảnh
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={
              handleImageChange
            }
          />

          {form.image && (

            <div className="pm-preview">

              <img
                src={form.image}
                alt=""
              />

            </div>

          )}

        </div>

        <div className="pm-section">

          <h3>
            Giá dịch vụ
          </h3>

          <div className="pm-grid">

            <div>

                <label>
                Giá hiển thị trên card
                </label>

                <input
                name="price"
                placeholder="Ví dụ: 180.000đ"
                value={form.price}
                onChange={handleChange}
                />

            </div>

            <div>

              <label>
                Giá nội thành
              </label>

              <input
                name="cityPrice"
                value={
                  form.cityPrice
                }
                onChange={
                  handleChange
                }
              />

            </div>

            <div>

              <label>
                Giá ngoại thành
              </label>

              <input
                name="suburbPrice"
                value={
                  form.suburbPrice
                }
                onChange={
                  handleChange
                }
              />

            </div>

          </div>

          <label>
            Thời gian khuyến mãi
          </label>

          <input
            name="promotionPeriod"
            value={
              form.promotionPeriod
            }
            onChange={
              handleChange
            }
          />

        </div>

        <div className="pm-section">
          <h3>Khuyến mãi</h3>

          <textarea
            rows="5"
            name="promotion"
            value={
              form.promotion
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="pm-section">
          <h3>Ưu điểm</h3>

          <textarea
            rows="5"
            name="advantages"
            value={
              form.advantages
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="pm-section">

          <h3>
            Phạm vi phủ sóng
          </h3>

          <div className="pm-grid">

            <textarea
              rows="5"
              name="urbanCoverage"
              value={
                form.urbanCoverage
              }
              onChange={
                handleChange
              }
            />

            <textarea
              rows="5"
              name="suburbanCoverage"
              value={
                form.suburbanCoverage
              }
              onChange={
                handleChange
              }
            />

          </div>

        </div>

        <div className="pm-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Hủy
          </button>

          <button
            className="save-btn"
            disabled={loading}
            onClick={
              handleSubmit
            }
          >
            {loading
              ? "Đang lưu..."
              : "Lưu"}
          </button>

        </div>

      </div>

    </div>

  );
}

export default ProductModal;