import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../components/AdminLayout";

import {
  getHKDs,
  createHKD,
  updateHKD,
  deleteHKD,
} from "../../services/hkdService";
import { toast } from "react-toastify";
import "../styles/hkds.css";

function HKDAdmin() {
  const [packages, setPackages] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [deleteId, setDeleteId] =
    useState(null);

  const [page, setPage] =
    useState(1);

  const limit = 5;

  const [form, setForm] =
    useState({
      title: "",
      price: "",
      featured: false,
    });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const loadData = 
    async () => {
      const res =
        await getHKDs();

      setPackages(res.data);
    };

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setForm({
      ...form,
      [name]:
        type ===
        "checkbox"
          ? checked
          : value,
    });
  };

  const handleAdd = () => {
    setEditingId(null);

    setForm({
      title: "",
      price: "",
      featured: false,
    });

    setShowModal(true);
  };

  const handleEdit = (
    item
  ) => {
    setEditingId(item._id);

    setForm({
      title: item.title,
      price: item.price,
      featured:
        item.featured,
    });

    setShowModal(true);
  };

  const handleSave =
    async () => {

      try {

        if (editingId) {

          await updateHKD(
            editingId,
            form
          );

          toast.success(
            "Cập nhật gói thành công"
          );

        } else {

          await createHKD(
            form
          );

          toast.success(
            "Thêm gói thành công"
          );

        }

        setShowModal(false);

        loadData();

      } catch (error) {

        toast.error(
          "Có lỗi xảy ra"
        );

      }

    };

  const handleDelete =
    (id) => {

      setDeleteId(id);

    };

  const confirmDelete =
    async () => {

      try {

        await deleteHKD(
          deleteId
        );

        toast.success(
          "Xóa gói thành công"
        );

        loadData();

      } catch (error) {

        toast.error(
          "Xóa gói thất bại"
        );

      }

      setDeleteId(null);

    };

  const filtered =
    packages.filter(
      (item) =>
        item.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const start =
    (page - 1) *
    limit;

  const end =
    start + limit;

  const paginated =
    filtered.slice(
      start,
      end
    );

  return (
    <AdminLayout>
      <div className="hkd-page">

        <div className="page-header">
          <h1>
            Quản lý Hộ kinh doanh
          </h1>

          <button
            className="add-btn"
            onClick={
              handleAdd
            }
          >
            + Thêm mới
          </button>
        </div>

        <div className="toolbar">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>

        <table className="hkd-table">

          <thead>
            <tr>
              <th>
                Tên gói
              </th>

              <th>
                Giá
              </th>

              <th>
                Nổi bật
              </th>

              <th>
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>

            {paginated.map(
              (item) => (
                <tr
                  key={item._id}
                >
                  <td>
                    {item.title}
                  </td>

                  <td>
                    {item.price}
                  </td>

                  <td>
                    {item.featured
                      ? "⭐"
                      : "-"}
                  </td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(
                          item
                        )
                      }
                    >
                      Sửa
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          item._id
                        )
                      }
                    >
                      Xóa
                    </button>

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

        <div className="pagination">

          <button
            disabled={
              page === 1
            }
            onClick={() =>
              setPage(
                page - 1
              )
            }
          >
            Trước
          </button>

          <span>
            Trang {page}
          </span>

          <button
            disabled={
              end >=
              filtered.length
            }
            onClick={() =>
              setPage(
                page + 1
              )
            }
          >
            Sau
          </button>

        </div>

        {showModal && (

          <div className="modal">

            <div className="modal-content hkd-modal">

              <h2>
                {editingId
                  ? "Cập nhật gói"
                  : "Thêm gói"}
              </h2>

              <div className="form-group">

                <label>
                  Tên gói
                </label>

                <input
                  name="title"
                  placeholder="Nhập tên gói"
                  value={form.title}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Giá
                </label>

                <input
                  name="price"
                  placeholder="Ví dụ: 199.000đ"
                  value={form.price}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group checkbox-group">

                <label>

                  <input
                    type="checkbox"
                    name="featured"
                    checked={
                      form.featured
                    }
                    onChange={
                      handleChange
                    }
                  />

                  Gói nổi bật

                </label>

              </div>

              <div className="modal-actions">

                <button
                  className="save-btn"
                  onClick={
                    handleSave
                  }
                >
                  Lưu
                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >
                  Hủy
                </button>

              </div>

            </div>

          </div>

        )}

        {deleteId && (

          <div className="confirm-overlay">

            <div className="confirm-modal">

              <div className="confirm-icon">
                🗑️
              </div>

              <h3>
                Xóa gói?
              </h3>

              <p>
                Hành động này không thể hoàn tác.
              </p>

              <div className="confirm-actions">

                <button
                  className="cancel-confirm"
                  onClick={() =>
                    setDeleteId(null)
                  }
                >
                  Hủy
                </button>

                <button
                  className="delete-confirm"
                  onClick={
                    confirmDelete
                  }
                >
                  Xóa
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </AdminLayout>
  );
}

export default HKDAdmin;