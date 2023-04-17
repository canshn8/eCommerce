import { useDispatch } from "react-redux";
import {  addUser } from "../../redux/apiCalls";
import { useState } from "react";
import "./newUser.css";

export default function NewUser() {
    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()

   
    
    const user = {username,password,email}
    const hanldeAdd = () => {
        addUser(user, dispatch);
    };
  
    return (
        <div className="newUser">
            <div className="addUserTitle">
                <h1>Yeni Kullanıcı</h1>
            </div>
            <div className="addUserItem">
                <input className="newUsername" placeholder="Kullanıcı Adı" type="text" value={username} onChange={(e)=> setUsername(e.target.value) } />
             </div>
            <div className="addUserItem">
                <input className="newEmail" placeholder="Email" type="text" value={email} onChange={(e)=> setEmail(e.target.value) }/>
            </div>     
            <div className="addUserItem">
                <input className="newPassword" placeholder="Parola" type="password" value={password} onChange={(e)=> setPassword(e.target.value) }/>
            </div>        
            <button onClick={hanldeAdd} className="addUserBtn">Oluştur</button>
        </div>
    );
}