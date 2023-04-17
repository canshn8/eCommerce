import { BsFacebook, BsInstagram, BsPinterest, BsTwitter, BsTelephone } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./style.css"




const Footer = () => {
  return (
      <footer>
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social_icon">
          <li><a href="#"><BsFacebook/></a></li>
          <li><a href="#"><BsInstagram/></a></li>
          <li><a href="#"><BsPinterest/></a></li>
          <li><a href="#"><BsTwitter/></a></li>
        </ul>
        <ul className="menu">
          <li><a href="/">ANASAYFA</a></li>
          <li><a href="/about">HAKKIMIZDA</a></li>
          <li><a href="#kategori">KATEGORİLER</a></li>
          <li><a href="/cart">SEPETİM</a></li>
        </ul>
        <p>©2023 DSM Grup Danışmanlık İletişim ve Satış Tic.A.Ş.-Her Hakkı Saklıdır. </p>
      </footer>
  );
};

export default Footer;
