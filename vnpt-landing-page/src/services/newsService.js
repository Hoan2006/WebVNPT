import axios from "axios";

const API =
  "http://localhost:5000/api/news";

export const getNews =
  () => axios.get(API);

export const createNews =
  (data) =>
    axios.post(API, data);

export const updateNews =
  (id, data) =>
    axios.put(
      `${API}/${id}`,
      data
    );

export const deleteNews =
  (id) =>
    axios.delete(
      `${API}/${id}`
    );