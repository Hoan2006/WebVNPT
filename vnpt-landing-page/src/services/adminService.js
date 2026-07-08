import axios from "axios";

export const adminLogin =
async(data)=>{

  return await axios.post(
    "http://localhost:5000/api/admin/login",
    data
  );

};