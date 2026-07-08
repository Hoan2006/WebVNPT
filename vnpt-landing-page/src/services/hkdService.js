import axios from "axios";

const API =
  "http://localhost:5000/api/hkds";

const authConfig = () => ({

  headers:{

    Authorization:
    `Bearer ${localStorage.getItem("token")}`

  }

});

export const getHKDs =
() => axios.get(API);

export const createHKD =
(data)=>
axios.post(
  API,
  data,
  authConfig()
);

export const updateHKD =
(id,data)=>
axios.put(
  `${API}/${id}`,
  data,
  authConfig()
);

export const deleteHKD =
(id)=>
axios.delete(
  `${API}/${id}`,
  authConfig()
);