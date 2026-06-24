import axios from "axios";

const API_URL =
  "http://localhost:5000/api/products";

/* Lấy tất cả sản phẩm */
export const getProducts = async () => {
  return await axios.get(API_URL);
};

/* Lấy chi tiết sản phẩm */
export const getProductById = async (id) => {
  return await axios.get(
    `${API_URL}/${id}`
  );
};

/* Thêm sản phẩm */
export const createProduct = async (
  productData
) => {
  return await axios.post(
    API_URL,
    productData
  );
};

/* Cập nhật sản phẩm */
export const updateProduct = async (
  id,
  productData
) => {
  return await axios.put(
    `${API_URL}/${id}`,
    productData
  );
};
 
/* Xóa sản phẩm */
export const deleteProduct = async (
  id
) => {
  return await axios.delete(
    `${API_URL}/${id}`
  );
}; 

export const uploadImage =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    return await axios.post(
      "http://localhost:5000/api/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };