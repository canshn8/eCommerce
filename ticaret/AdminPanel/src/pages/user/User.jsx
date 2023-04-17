import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { updateUser } from "../../redux/apiCalls";
import { useEffect, useState } from "react";
import "./user.css";




export default function User() {

  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const dispatch = useDispatch()

  const users = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );


  const user= {username,password,email}
  const handleUpdate = (id) => {
    updateUser(id,user,dispatch)
  } 

  

      return (
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Kullanıcı: {users.username}</h1>
          </div>
          <div className="userTop">
            <div className="userTopRight">
              <div className="userInfoTop">
                <span className="userInfoKey">ID:</span>
                <span className="userInfoValue">{users._id}</span>
              </div>
              <div className="userInfoBottom">
                  <span className="userName">Kullanıcı:</span>
                  <span className="userInfoValue">{users.username}</span>
                <div className="userInfoItem">
                  <span className="userInfoKey">Gmail:</span>
                  <span className="userInfoValue">{users.email}</span>
                </div>
                <div className="userInfoImg">
                  <img src={users.img} alt="" className="userInfoImg" />
                </div>
              </div>
            </div>
          </div>
          <div className="userBottom">
              <div className="userFormLeft">
                <label>Kullanıcı Adı:</label>
                <input type="text" placeholder={users.username} value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="text" placeholder={users.email} value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label>Parola</label>
                <input type="text" placeholder={users.password} value={password} onChange={(e) => setPassword(e.target.value)}/>
                {/*<label>Admin</label>
                 <select name="isAdmin" id="idStock" value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}>
                  <option value="true">Evet</option>
                  <option value="false">Hayır</option>
                </select> */}
              </div>
              <div className="userFormRight">
                <div className="userUpload">
                  <img src={users.img} alt="" className="userUploadImg" />
                  <label htmlFor="file">
                    <span>Ekle</span>
                  </label>
                  <input type="file" id="file" style={{ display: "none" }}/>
                </div>
                <button className="userBtn" onClick={() => handleUpdate(users._id)}>Güncelle</button>
              </div>
          </div>
        </div>
      );
}