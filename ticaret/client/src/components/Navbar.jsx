import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { React, useRef } from "react";
import "./responsive.css"
import { MdAddChart, MdFavoriteBorder } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { logout } from "../redux/userRedux";



const Navbar = () => {
  const navigate = useHistory();
  const auth = useSelector((state) => state.user?.isLoggedIn);
  const user = useSelector((state) => state.user?.currentUser?.username);
  console.log(user)
  const navRef = useRef();
  const dispatch = useDispatch();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav")
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header>
      <nav ref={navRef}>
        <div class="homepage leftIcon">
          <i class="fa-solid fa-shop"></i>
          <a href="/">ANASAYFA</a>
          <a href="/search"><CiSearch /></a>
        </div>
        <div class="right">
          <a
            className="leftIcon"
            href="/search"
          ></a>
          <a
            className="rightIcon"
            href="/favorites"
          ><MdFavoriteBorder /></a>
          <a
            className="rightIcon"
            href="/cart"
          ><CiShoppingCart /></a>
          {
            auth ?
              <div>
                <a className="profile" href="/profile">{user}</a>
                <a onClick={handleLogout} className="rightIcon" href="/">ÇIKIŞ</a>
              </div>
              :
              <a
                className="rightIcon"
                href="/login">
                <CiUser />
              </a>
          }
        </div>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navbar;
