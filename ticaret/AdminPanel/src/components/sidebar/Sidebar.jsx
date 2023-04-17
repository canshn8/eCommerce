import "./sidebar.css"
import { MdLineStyle } from "react-icons/md";
import { CgComment, CgTranscript } from "react-icons/cg";
import { AiOutlineUser ,AiTwotoneShop, AiOutlineUserAdd, AiOutlineFolderAdd} from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      <div className="sidebarMenu">
          <h3 className="sidebarTitle">AnaSayfa</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarlistItem"><MdLineStyle className="sidebarIcon"/>AnaSayfa</li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Kullanıcı İşlemleri</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarlistItem"><AiOutlineUser className="sidebarIcon"/>Kullanıcılar</li>
            </Link>
            <Link to="/newUser" className="link">
              <li className="sidebarlistItem"><AiOutlineUserAdd className="sidebarIcon"/>Yeni Kullanıcı Ekle</li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Ürün İşlemleri</h3>
          <ul className="sidebarList">
            <Link to="/products" className="link">
              <li className="sidebarlistItem"><AiTwotoneShop className="sidebarIcon"/>Ürünler</li>
            </Link>
            <Link to="/newProduct" className="link">
              <li className="sidebarlistItem"><AiOutlineFolderAdd className="sidebarIcon"/>Yeni Ürün Ekle</li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Yorum İşlemleri</h3>
          <ul className="sidebarList">
            <Link to="/comments" className="link">
              <li className="sidebarlistItem"><CgComment className="sidebarIcon"/>Yorumlar</li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Maliyetler</h3>
          <ul className="sidebarList">
            <Link to="/cost" className="link">
              <li className="sidebarlistItem"><CgTranscript className="sidebarIcon"/>Kazanç Durumu</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}
