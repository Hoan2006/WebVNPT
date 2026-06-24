import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../components/AdminLayout";
import { toast }
from "react-toastify";

import ServiceModal
from "../components/ServiceModal";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../services/serviceService";

import "../styles/services.css";

function ServicesAdmin() {
  const [services, setServices] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [page, setPage] =
  useState(1);

  const limit = 5;  

  const [editingId, setEditingId] =
    useState(null);

  const [editingService,
  setEditingService] =
  useState(null);

  const [deleteId,
  setDeleteId] =
  useState(null);

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      image: "",
      features:[""]
    });
 
  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const loadServices =
    async () => {
      const res =
        await getServices();

      setServices(res.data);
    };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd = () => {

    setEditingService(
      null
    );

    setShowModal(true);

  };

  /* Start feature service admin */
  const addFeature = () => {
    setForm({
      ...form,
      features:[
        ...form.features,
        ""
      ]
    });
  };

  const handleFeatureChange =
  (index,value) => {

    const updated =
    [...form.features];

    updated[index] =
    value;

    setForm({
      ...form,
      features:updated
    });

  };

  const removeFeature =
  (index) => {

    const updated =
    form.features.filter(
      (_,i) => i !== index
    );

    setForm({
      ...form,
      features:updated
    });

  };
  /* End feature service admin */
 const handleEdit =
  (service) => {

    setEditingService(
      service
    );

    setShowModal(true);

  };

  const handleSave =
    async () => {
      if (editingId) {
        await updateService(
          editingId,
          form
        );
      } else {
        await createService(
          form
        );
      }

      setShowModal(false);

      loadServices();
    };

  const handleDelete =
  (id) => {

    setDeleteId(id);

  };

  const confirmDelete =
  async () => {

    try {

      await deleteService(
        deleteId
      );

      toast.success(
        "Xóa dịch vụ thành công"
      );

      loadServices();

    } catch(error){

      toast.error(
        "Xóa dịch vụ thất bại"
      );

    } finally {

      setDeleteId(null);

    }

  };

  const filtered =
    services.filter((item) =>
      item.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const start =
    (page - 1) * limit;

  const end =
    start + limit;

  const paginated =
    filtered.slice(
      start,
      end
    );  
    
  return (
    <AdminLayout>
      <div className="services-page">
        <div className="page-header">
          <h1>
            Quản lý Dịch vụ
          </h1>

          <button
            className="add-btn"
            onClick={handleAdd}
          >
            + Thêm mới
          </button>
        </div>

        <div className="toolbar">
          <input
            type="text"
            placeholder="Tìm dịch vụ..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>

        <table className="services-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên dịch vụ</th>
              <th>Mô tả</th>
              <th>Tính năng</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map(
              (item) => (
                <tr
                  key={item._id}
                >
                  <td>
                    <img
                      src={
                        item.image
                      }
                      alt=""
                      className="service-img"
                    />
                  </td>

                  <td>
                    {item.title}
                  </td>

                  <td>
                    {
                      item.description
                    }
                  </td>
                  
                  <td>
                    {
                      item.features
                        ?.length || 0
                    }
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

        {
          showModal && (

            <ServiceModal
              service={
                editingService
              }
              onClose={() =>
                setShowModal(false)
              }
              onSuccess={() => {

                loadServices();

                setShowModal(
                  false
                );

              }}
            />

          )
        }

        {
          deleteId && (

            <div className="confirm-overlay">

              <div className="confirm-modal">

                <div className="confirm-icon">
                  🗑️
                </div>

                <h3>
                  Xóa dịch vụ
                </h3>

                <p>
                  Bạn có chắc muốn
                  xóa dịch vụ này?
                </p>

                <div className="confirm-actions">

                  <button
                    className="cancel-delete"
                    onClick={() =>
                      setDeleteId(null)
                    }
                  >
                    Hủy
                  </button>

                  <button
                    className="confirm-delete"
                    onClick={
                      confirmDelete
                    }
                  >
                    Xóa
                  </button>

                </div>

              </div>

            </div>

          )
        }
      </div>
    </AdminLayout>
  );
}

export default ServicesAdmin;