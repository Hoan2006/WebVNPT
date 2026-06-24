import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../components/AdminLayout";
import { toast } from "react-toastify";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

import {
  uploadImage
} from "../../services/productService";

import "../styles/products.css";
import ProductModal from "../components/ProductModal";

function ProductsAdmin() {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [page, setPage] =
  useState(1);

  const limit = 5;

  const [editingProduct, setEditingProduct] =
  useState(null);
  
  const [deleteId, setDeleteId] =
  useState(null);
  
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const loadProducts =
    async () => {
      const res =
        await getProducts();

      setProducts(res.data);
    };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {

    try {

      await deleteProduct(deleteId);

      toast.success(
        "Xóa gói thành công"
      );

      loadProducts();

    } catch (error) {

      console.log(error);

      toast.error(
        "Xóa gói thất bại"
      );

    } finally {

      setDeleteId(null);

    }

  };

  const filteredProducts =
    products.filter((p) =>
      p.title
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
  filteredProducts.slice(
    start,
    end
  );

  return (
    <AdminLayout>
      <div className="products-page">

        <div className="page-header"> 
          <h1>
            Quản lý Gói khuyến mãi
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
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>

        <table className="products-table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên gói</th>
              <th>Giá ngoại thành</th>
              <th>Giá nội thành</th>
              <th>Mô tả</th>
              <th>Khuyến mãi</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((item) => (
              <tr key={item._id}>

                <td>
                  <img
                    src={item.image}
                    alt=""
                    className="product-img"
                  />
                </td>

                <td className="title-cell">
                  <div className="product-title">
                    {item.title}
                  </div>
                </td>

                <td className="price-cell">
                  {item.suburbPrice}
                </td>

                <td className="price-cell">
                  {item.cityPrice}
                </td>

                <td className="desc-cell">
                  <div className="product-desc">
                    {item.description}
                  </div>
                </td>

                <td className="promotion-cell">
                  <div className="product-promotion">
                    {item.promotionPeriod}
                  </div>
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(item)
                    }
                  > 
                    Sửa
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(item._id)
                    }
                  >
                    Xóa
                  </button>
                </td>

              </tr>
            ))}
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
              filteredProducts.length
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
          <ProductModal
            product={editingProduct}
            onClose={() =>
              setShowModal(false)
            }
            onSuccess={() => {
              loadProducts();
              setShowModal(false);
            }}
          />
        )}

        {
          deleteId && (

            <div className="confirm-overlay">

              <div className="confirm-modal">

                <div className="confirm-icon">
                  🗑️
                </div>

                <h3>
                  Xóa gói khuyến mãi
                </h3>

                <p>
                  Bạn có chắc muốn xóa
                  gói này không?
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
 
export default ProductsAdmin;