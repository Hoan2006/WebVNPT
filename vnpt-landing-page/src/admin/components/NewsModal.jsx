import { useState } from "react";
import { toast } from "react-toastify";

import {
  createNews,
  updateNews,
  uploadImage,
} from "../../services/newsService";

import "../styles/newsModal.css";

function NewsModal({
  news,
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
        news?.title || "",

      date:
        news?.date || "",

      author:
        news?.author || "",

      image:
        news?.image || "",

      category:
        news?.category || "",

      excerpt:
        news?.excerpt || "",

      content:
        news?.content || "",
    });

  const handleChange = (
    e
  ) => {
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
            uploadRes.data
              .imageUrl;
        }

        const payload = {
          ...form,
          image: imageUrl,
        };

        if (news?._id) {
          await updateNews(
            news._id,
            payload
          );

          toast.success(
            "Cập nhật bài viết thành công"
          );
        } else {
          await createNews(
            payload
          );

          toast.success(
            "Thêm bài viết thành công"
          );
        }

        onSuccess();
      } catch (error) {
        console.log(error);

        toast.error(
          news
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
            {news
              ? "Cập nhật bài viết"
              : "Thêm bài viết"}
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
                Tiêu đề
              </label>

              <input
                name="title"
                value={
                  form.title
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <label>
                Chuyên mục
              </label>

              <input
                name="category"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <label>
                Ngày đăng
              </label>

              <input
                name="date"
                value={
                  form.date
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <label>
                Tác giả
              </label>

              <input
                name="author"
                value={
                  form.author
                }
                onChange={
                  handleChange
                }
              />
            </div>

          </div>

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
                src={
                  form.image
                }
                alt=""
              />
            </div>
          )}

        </div>

        <div className="pm-section">

          <h3>
            Mô tả ngắn
          </h3>

          <textarea
            rows="4"
            name="excerpt"
            value={
              form.excerpt
            }
            onChange={
              handleChange
            }
          />

        </div>

        <div className="pm-section">

          <h3>
            Nội dung bài viết
          </h3>

          <textarea
            rows="14"
            name="content"
            value={
              form.content
            }
            onChange={
              handleChange
            }
          />

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

export default NewsModal;