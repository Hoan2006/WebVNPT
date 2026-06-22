import axios from "axios";

const API =
  "http://localhost:5000/api/hkds";

export const getHKDs =
  () => axios.get(API);

export const createHKD =
  (data) =>
    axios.post(
      API,
      data
    );

export const updateHKD =
  (id, data) =>
    axios.put(
      `${API}/${id}`,
      data
    );

export const deleteHKD =
  (id) =>
    axios.delete(
      `${API}/${id}`
    );