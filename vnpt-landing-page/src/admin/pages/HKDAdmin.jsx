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
      if (editingId) {
        await updateHKD(
          editingId,
          form
        );
      } else {
        await createHKD(
          form
        );
      }

      setShowModal(false);

      loadData();
    };

  const handleDelete =
    async (id) => {
      const ok =
        window.confirm(
          "Xóa gói này?"
        );

      if (!ok) return;

      await deleteHKD(id);

      loadData();
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

            <div className="modal-content">

              <h2>
                {editingId
                  ? "Cập nhật gói"
                  : "Thêm gói"}
              </h2>

              <input
                name="title"
                placeholder="Tên gói"
                value={
                  form.title
                }
                onChange={
                  handleChange
                }
              />

              <input
                name="price"
                placeholder="Giá"
                value={
                  form.price
                }
                onChange={
                  handleChange
                }
              />

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

              <div className="modal-actions">

                <button
                  onClick={
                    handleSave
                  }
                >
                  Lưu
                </button>

                <button
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

      </div>
    </AdminLayout>
  );
}

export default HKDAdmin;