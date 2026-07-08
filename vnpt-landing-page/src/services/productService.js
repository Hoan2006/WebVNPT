import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const API_URL = `${BASE_URL}/api/products`; 

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* Lấy tất cả sản phẩm */
export const getProducts = async () => {
  return await axios.get(API_URL);
};

/* Lấy chi tiết sản phẩm */
export const getProductById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

/* Thêm sản phẩm */
export const createProduct = async (productData) => {
  return await axios.post(API_URL, productData, authConfig());
};

/* Cập nhật sản phẩm */
export const updateProduct = async (id, productData) => {
  return await axios.put(`${API_URL}/${id}`, productData, authConfig());
};

/* Xóa sản phẩm */
export const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, authConfig());
};

/* Upload ảnh */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return await axios.post(`${BASE_URL}/api/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};