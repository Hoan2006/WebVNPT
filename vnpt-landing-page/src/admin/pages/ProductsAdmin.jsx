import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../components/AdminLayout";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

import "../styles/products.css";

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

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
  useState({
    title:"",
    description:"",
    price:"",
    image:"",
    category:"",

    cityPrice:"",
    suburbPrice:"",
    promotionPeriod:"",

    promotion:"",
    advantages:"",

    urbanCoverage:"",
    suburbanCoverage:""
  });

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd = () => {
    setEditingId(null);

    setForm({
      title:"",
      description:"",
      price:"",
      image:"",
      category:"",

      cityPrice:"",
      suburbPrice:"",
      promotionPeriod:"",

      promotion:"",
      advantages:"",

      urbanCoverage:"",
      suburbanCoverage:""
    });

    setShowModal(true);
  };

  const handleEdit = (
    product
  ) => {
    setEditingId(product._id);

    setForm({
      title:
        product.title || "",

      description:
        product.description || "",

      price:
        product.price || "",

      image:
        product.image || "",

      category:
        product.category || "",

      cityPrice:
        product.cityPrice || "",

      suburbPrice:
        product.suburbPrice || "",

      promotionPeriod:
        product.promotionPeriod || "",

      promotion:
        product.promotion?.join("\n") || "",

      advantages:
        product.advantages?.join("\n") || "",

      urbanCoverage:
        product.coverage?.urban?.join("\n") || "",

      suburbanCoverage:
        product.coverage?.suburban?.join("\n") || ""
    });

    setShowModal(true);
  };

  const handleSave =
    async () => {
      const payload = {
        title: form.title,
        description: form.description,
        price: form.price,
        image: form.image,
        category: form.category,

        cityPrice: form.cityPrice,
        suburbPrice: form.suburbPrice,
        promotionPeriod: form.promotionPeriod,

        promotion: (form.promotion || "")
          .split("\n")
          .filter(Boolean),

        advantages: (form.advantages || "")
          .split("\n")
          .filter(Boolean),

        coverage:{
          urban:(form.urbanCoverage || "")
            .split("\n")
            .filter(Boolean),

          suburban:(form.suburbanCoverage || "")
            .split("\n")
            .filter(Boolean)
        }
      };

      if(editingId){

        await updateProduct(
          editingId,
          payload
        );

      }else{

        await createProduct(
          payload
        );

      }

      setShowModal(false);

      loadProducts();
    };

  const handleDelete =
    async (id) => {
      const ok =
        window.confirm(
          "Xóa sản phẩm?"
        );

      if (!ok) return;

      await deleteProduct(id);

      loadProducts();
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
          <div className="modal">
            <div className="modal-content">
              <h2>
                {editingId
                  ? "Cập nhật"
                  : "Thêm mới"}
              </h2>

              <input
                name="title"
                placeholder="Tên gói"
                value={form.title}
                onChange={
                  handleChange
                }
              />

              <input
                name="description"
                placeholder="Mô tả"
                value={form.description}
                onChange={handleChange}
              />

              <input
                name="price"
                placeholder="Giá"
                value={form.price}
                onChange={
                  handleChange
                }
              />

              <input
                name="image"
                placeholder="Ảnh"
                value={form.image}
                onChange={handleChange}
              />

              {
                form.image && (

                  <div className="image-preview">

                    <img
                      src={form.image}
                      alt=""
                    />

                  </div>

                )
              }

              <input
                name="promotionPeriod"
                placeholder="Thời gian khuyến mãi"
                value={form.promotionPeriod}
                onChange={handleChange}
              />

              <input
                name="cityPrice"
                placeholder="Giá nội thành"
                value={form.cityPrice}
                onChange={handleChange}
              />

              <input
                name="suburbPrice"
                placeholder="Giá ngoại thành"
                value={form.suburbPrice}
                onChange={handleChange}
              />

              <textarea
                name="promotion"
                placeholder="Mỗi dòng 1 khuyến mãi"
                value={form.promotion}
                onChange={handleChange}
              />

              <textarea
                name="advantages"
                placeholder="Mỗi dòng 1 ưu điểm"
                value={form.advantages}
                onChange={handleChange}
              />

              <textarea
                name="urbanCoverage"
                placeholder="Phạm vi nội thành"
                value={form.urbanCoverage}
                onChange={handleChange}
              />

              <textarea
                name="suburbanCoverage"
                placeholder="Phạm vi ngoại thành"
                value={form.suburbanCoverage}
                onChange={handleChange}
              />

              <input
                name="category"
                placeholder="Danh mục"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
              />

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
 
export default ProductsAdmin;