import { useHistory } from 'react-router-dom';
import { login } from "../../redux/apiCalls";
import { useDispatch } from 'react-redux';
import  {React, useState } from 'react'
import "./login.css"


const Login = () => {

    const history = useHistory()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch() 

    const handleClick = (e) => {
      e.preventDefault()
      login(dispatch,{username,password})
      history.push("/")
    }

  return (
    <div className="loginContainer">
        <input type="text" placeholder='Kullanıcı Adı' onChange={e=>setUsername(e.target.value)}/>
        <input type="password" placeholder='Parola' onChange={e=>setPassword(e.target.value)}/>
        <button className="loginBtn" onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login