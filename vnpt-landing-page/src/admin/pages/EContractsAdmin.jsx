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
      if (editingId) {
        await updateEContract(
          editingId,
          form
        );
      } else {
        await createEContract(
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

      await deleteEContract(
        id
      );

      loadData();
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

            <div className="modal-content">

              <h2>
                {editingId
                  ? "Cập nhật gói"
                  : "Thêm gói"}
              </h2>

              <input
                name="name"
                placeholder="Tên gói"
                value={
                  form.name
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

              <input
                name="description"
                placeholder="Mô tả"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
              />

              <input
                name="buttonText"
                placeholder="Text nút"
                value={
                  form.buttonText
                }
                onChange={
                  handleChange
                }
              />

              <label>
                <input
                  type="checkbox"
                  name="popular"
                  checked={
                    form.popular
                  }
                  onChange={
                    handleChange
                  }
                />

                Gói nổi bật
              </label>

              <h3>
                Danh sách tính năng
              </h3>

              {form.features?.map(
                (
                  feature,
                  index
                ) => (
                  <div
                    key={
                      index
                    }
                    className="feature-row"
                  >
                    <input
                      value={
                        feature
                      }
                      onChange={(
                        e
                      ) =>
                        handleFeatureChange(
                          index,
                          e
                            .target
                            .value
                        )
                      }
                    />

                    <button
                      type="button"
                      className="delete-feature"
                      onClick={() =>
                        removeFeature(
                          index
                        )
                      }
                    >
                      X
                    </button>
                  </div>
                )
              )}

              <button
                type="button"
                className="add-feature"
                onClick={
                  addFeature
                }
              >
                + Thêm tính năng
              </button>

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

export default EContractsAdmin;