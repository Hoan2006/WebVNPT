import axios from "axios";

const API =
  "http://localhost:5000/api/econtracts";

const authConfig = () => ({

  headers:{

    Authorization:
    `Bearer ${localStorage.getItem("token")}`

  }

});

/* Lấy danh sách */

export const getEContracts =
() => axios.get(API);

/* Thêm */

export const createEContract =
(data)=>
axios.post(
  API,
  data,
  authConfig()
);

/* Cập nhật */

export const updateEContract =
(id,data)=>
axios.put(
  `${API}/${id}`,
  data,
  authConfig()
);

/* Xóa */

export const deleteEContract =
(id)=>
axios.delete(
  `${API}/${id}`,
  authConfig()
);