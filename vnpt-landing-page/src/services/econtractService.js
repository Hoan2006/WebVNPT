import axios from "axios";

const API =
  "http://localhost:5000/api/econtracts";

/* Lấy danh sách */

export const getEContracts =
  () => axios.get(API);

/* Thêm */

export const createEContract =
  (data) =>
    axios.post(
      API,
      data
    );

/* Cập nhật */
 
export const updateEContract =
  (id, data) =>
    axios.put(
      `${API}/${id}`,
      data
    );

/* Xóa */

export const deleteEContract =
  (id) =>
    axios.delete(
      `${API}/${id}`
    );