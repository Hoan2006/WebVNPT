import {
 useState
}
from "react";

import {
 useNavigate
}
from "react-router-dom";

import {
 useAuth
}
from "../context/AuthContext";

import "../styles/admin-login.css";

function AdminLogin(){

 const [username,setUsername] = useState("");
 const [password,setPassword] = useState("");
 const [error,setError] = useState("");
 const { login } = useAuth();

 const navigate =
 useNavigate();

 const handleLogin = ()=>{
  const ok =
  login(
    username,
    password
  );

  if(ok){

    navigate("/admin");

  }
  else{

    setError(
      "Sai tài khoản hoặc mật khẩu"
    );

  }

 };



 return (

 <div className="admin-login">


   <div className="login-box">


    <h2>
      Admin Login
    </h2>


    <input

      placeholder="Username"

      value={username}

      onChange={
        e=>setUsername(
          e.target.value
        )
      }

    />


    <input

      type="password"

      placeholder="Password"

      value={password}

      onChange={
        e=>setPassword(
          e.target.value
        )
      }

    />


    {
      error &&
      <p className="error">
        {error}
      </p>
    }



    <button
      onClick={handleLogin}
    >

      Đăng nhập

    </button>



   </div>


 </div>

 )


}


export default AdminLogin;