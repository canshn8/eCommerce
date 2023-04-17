import Navbar  from "../components/Navbar";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./style.css"

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [passVerification, setpassVerification] = useState("")
    const navigate = useHistory();

    async function addNewUser() {

        if (password === passVerification) {

            const item = { username, password, email }
            console.log(item);

            const result = await axios.post("http://localhost:5000/api/auth/register", {
                username: username,
                email: email,
                password: password,
            })
            console.log(result);
            navigate.push("/login")
        } else {
            alert(" Parolalar Eşleşmiyor")
        }
    }


return (

<div>
  <Navbar/>
    <div className="registerPage">
      <div className="registerForm">
        <h1>KAYIT OL</h1>
        <input className="input" type="text" placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="input" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Parola" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="input" type="password" placeholder="Parola Tekrar" value={passVerification} onChange={(e) => setpassVerification(e.target.value)} />
        <div className="registerBtn">
          <button className="event" onClick={addNewUser}> KAYIT OL</button>
        </div>
        <Link className="registerText" to="/login">ZATEN Bİ HESABIM VAR</Link>
      </div>
    </div>
</div>
    
    );
};

export default Register;