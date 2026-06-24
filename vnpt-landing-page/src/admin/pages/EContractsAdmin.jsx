import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../components/AdminLayout";

import {
  getEContracts,
  createEContract,
  updateEContract,
  deleteEContract,
} from "../../services/econtractService";
import { toast } from "react-toastify";
import "../styles/econtracts.css";

function EContractsAdmin() {
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
      name: "",
      price: "",
      description: "",
      buttonText: "",
      popular: false,
      features: [""],
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
        await getEContracts();

      setPackages(res.data);
    };

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
      type,
      checked,
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

  const addFeature = () => {
    setForm({
      ...form,
      features: [
        ...form.features,
        "",
      ],
    });
  };

  const handleFeatureChange =
    (
      index,
      value
    ) => {
      const updated =
        [...form.features];

      updated[index] =
        value;

      setForm({
        ...form,
        features:
          updated,
      });
    };

  const removeFeature =
    (index) => {
      const updated =
        form.features.filter(
          (_, i) =>
            i !== index
        );

      setForm({
        ...form,
        features:
          updated,
      });
    };

  const handleAdd = () => {
    setEditingId(null);

    setForm({
      name: "",
      price: "",
      description: "",
      buttonText: "",
      popular: false,
      features: [""],
    });

    setShowModal(true);
  };

  const handleEdit = (
    item
  ) => {
    setEditingId(item._id);

    setForm({
      name: item.name,
      price: item.price,
      description:
        item.description,
      buttonText:
        item.buttonText,
      popular:
        item.popular,
      features:
        item.features ||
        [""],
    });

    setShowModal(true);
  };

  const handleSave =
  async () => {

    try {

      if (editingId) {

        await updateEContract(
          editingId,
          form
        );

        toast.success(
          "Cập nhật hợp đồng thành công"
        );

      } else {

        await createEContract(
          form
        );

        toast.success(
          "Thêm hợp đồng thành công"
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

        await deleteEContract(
          deleteId
        );

        toast.success(
          "Xóa hợp đồng thành công"
        );

        loadData();

      } catch (error) {

        toast.error(
          "Xóa hợp đồng thất bại"
        );

      }

      setDeleteId(null);

    };

  const filtered =
    packages.filter(
      (item) =>
        item.name
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
      <div className="econtracts-page">

        <div className="page-header">
          <h1>
            Quản lý Hợp đồng điện tử
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
            placeholder="Tìm kiếm gói..."
            value={search}
            onChange={(
              e
            ) =>
              setSearch(
                e.target
                  .value
              )
            }
          />
        </div>

        <table className="econtracts-table">

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
                Tính năng
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
                  key={
                    item._id
                  }
                >
                  <td>
                    {
                      item.name
                    }
                  </td>

                  <td>
                    {
                      item.price
                    }
                  </td>

                  <td>
                    {item.popular
                      ? "⭐"
                      : "-"}
                  </td>

                  <td>
                    {item
                      .features
                      ?.length ||
                      0}
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

            <div className="modal-content econtract-modal">

              <h2>
                {editingId
                  ? "Cập nhật hợp đồng"
                  : "Thêm hợp đồng"}
              </h2>

              <div className="form-group">
                <label>Tên gói</label>

                <input
                  name="name"
                  placeholder="Nhập tên gói"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Giá</label>

                <input
                  name="price"
                  placeholder="Ví dụ: 199.000đ/tháng"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Mô tả</label>

                <textarea
                  name="description"
                  rows="3"
                  placeholder="Mô tả ngắn..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Text nút đăng ký</label>

                <input
                  name="buttonText"
                  placeholder="Đăng ký ngay"
                  value={form.buttonText}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group checkbox-group">

                <label>
                  <input
                    type="checkbox"
                    name="popular"
                    checked={form.popular}
                    onChange={handleChange}
                  />

                  Gói nổi bật
                </label>

              </div>

              <div className="feature-section">

                <h3>
                  Danh sách tính năng
                </h3>

                {form.features?.map(
                  (feature, index) => (
                    <div
                      key={index}
                      className="feature-row"
                    >
                      <input
                        placeholder={`Tính năng ${
                          index + 1
                        }`}
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(
                            index,
                            e.target.value
                          )
                        }
                      />

                      <button
                        type="button"
                        className="delete-feature"
                        onClick={() =>
                          removeFeature(index)
                        }
                      >
                        ✕
                      </button>

                    </div>
                  )
                )}

                <button
                  type="button"
                  className="add-feature"
                  onClick={addFeature}
                >
                  + Thêm tính năng
                </button>

              </div>

              <div className="modal-actions">

                <button
                  className="save-btn"
                  onClick={handleSave}
                >
                  Lưu
                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(false)
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
                Xóa hợp đồng?
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

export default EContractsAdmin;