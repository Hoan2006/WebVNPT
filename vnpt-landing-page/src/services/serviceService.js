import axios from "axios";

const API_URL =
  "http://localhost:5000/api/services";

export const getServices = async () =>
  await axios.get(API_URL);

export const createService = async (
  data
) =>
  await axios.post(
    API_URL,
    data
  );

export const updateService = async (
  id,
  data
) =>
  await axios.put(
    `${API_URL}/${id}`,
    data
  );

export const deleteService = async (
  id
) =>
  await axios.delete(
    `${API_URL}/${id}`
  );

/* upload image */

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