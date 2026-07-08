import axios from "axios";

const API =
  "http://localhost:5000/api/news";

const authConfig = () => ({

  headers:{

    Authorization:
    `Bearer ${localStorage.getItem("token")}`

  }

});

export const getNews =
() => axios.get(API);

export const createNews =
(data) =>
axios.post(
  API,
  data,
  authConfig()
);

export const updateNews =
(id,data)=>
axios.put(
  `${API}/${id}`,
  data,
  authConfig()
);

export const deleteNews =
(id)=>
axios.delete(
  `${API}/${id}`,
  authConfig()
);

export const uploadImage =
async(file)=>{

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
      headers:{

        "Content-Type":
        "multipart/form-data",

        Authorization:
        `Bearer ${localStorage.getItem("token")}`

      }
    }
  );

};