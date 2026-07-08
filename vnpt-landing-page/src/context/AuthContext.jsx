import {
  createContext,
  useState,
  useContext
} from "react";
import {
  adminLogin
}
from "../services/adminService";

const AuthContext =
createContext();

export function AuthProvider({children}){
  const [admin,setAdmin] =
  useState(
    JSON.parse(
      localStorage.getItem("admin")
    )
    ||
    null
  );

  const login =
  async (
    username,
    password
  )=>{

    try{

      const res =
      await adminLogin({

        username,
        password

      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(
          res.data.admin
        )
      );

      setAdmin(
        res.data.admin
      );

      return true;

    }catch(error){

      return false;

    }

  };

  const logout = ()=>{

    localStorage.removeItem("admin");

    localStorage.removeItem("token");

    setAdmin(null);

  };
  
  return (

    <AuthContext.Provider
      value={{
        admin,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}



export function useAuth(){

  return useContext(AuthContext);

}