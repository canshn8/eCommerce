import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./editProfile.css";
import { updateUser } from "../../redux/apiCalls";




export default function User() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("")
  const dispatch = useDispatch()

  const users = useSelector((state) => state.user);


  const user = {username,password,email}
      const handleUpdate = (id) => {
        updateUser(id,user,dispatch)
        console.log(user)
      } 

  

      return (
        <div className="user">
          <div className="userInfoBack">
            <div className="userTop">
                <div className="userInfoTop">
                  <div className="userInfoItem">
                    <span className="userName">Kullanıcı:</span>
                    <span className="userInfoValue">{users?.currentUser?.username}</span>
                  </div>  
                  <div className="userInfoItem">
                    <span className="userName">Gmail:</span>
                    <span className="userInfoValue">{users?.currentUser?.email}</span>
                  </div>
                </div>
            </div>
            <div className="userBottom">
                <div className="userFormBottom">
                  <label>Kullanıcı Adı:</label>
                  <input type="text" placeholder={users?.currentUser?.username} value={username} onChange={(e) => setUsername(e.target.value)}/>
                  <label>Email</label>
                  <input type="text" placeholder={users?.currentUser?.email} value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <label>Parola</label>
                  <input type="text" placeholder="Parola" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <label>Parola Tekrar</label>
                  <input type="text" placeholder="Parola Tekrar" value={passwordVerification} onChange={(e) => setPasswordVerification(e.target.value)}/>
                  <button className="userBtn" onClick={() => handleUpdate(users.currentUser._id)}>Güncelle</button>
                </div>
            </div>
          </div>
        </div>
      );
}