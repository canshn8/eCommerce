import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Navbar  from "../components/Navbar";
import { login } from "../redux/apiCalls";
import { useState } from "react";
import "./style.css"





const Login = () => {
  const user = useSelector((state) => state.user.accessToken);
  console.log(user)


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useHistory();

  const handleClick = (e) => {
    login(dispatch, { username, password });
    if(user!==null){
      navigate.push("/")
    }
  };


  return (
      <div>
        <Navbar/>
        <div className="loginPage">
        <div className="loginForm">
          <h1>GİRİŞ YAP</h1>
          <input className="input" type="text" placeholder="Kullanıcı Adı" onChange={(e) => setUsername(e.target.value)}/>
          <input className="input" type="password" placeholder="Parola" onChange={(e) => setPassword(e.target.value)}/>
          <div className="loginBtn">
            <button className="event" onClick={(e)=>handleClick()}>GİRİŞ YAP</button>
          </div>
          <Link className="loginText" to="/register">YENİ HESAP OLUŞTUR</Link>
        </div>
        </div>
      </div>
  );
};


export default Login;