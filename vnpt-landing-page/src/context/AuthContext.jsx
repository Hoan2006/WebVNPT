import {
  createContext,
  useState,
  useContext
} from "react";


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
  (username,password)=>{


    // tài khoản admin tạo sẵn

    const ADMIN = {
      username:"admin",
      password:"Hoan@123",
      role:"admin"
    };


    if(
      username === ADMIN.username &&
      password === ADMIN.password
    ){

      localStorage.setItem(
        "admin",
        JSON.stringify(ADMIN)
      );


      setAdmin(ADMIN);


      return true;

    }


    return false;

  };


  const logout = ()=>{

    localStorage.removeItem(
      "admin"
    );

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