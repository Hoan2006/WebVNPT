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