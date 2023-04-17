import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { useSelector , useDispatch} from "react-redux";
import {useState } from "react";
import axios from "axios"
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();


  const products = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );


  // const handleUpdate = async () => {
  //   console.log(title,desc,price,inStock,image)
  //   let result = await axios.put(`http://localhost:5000/api/products/${productId}`,{
  //     title:title,
  //     desc:desc,
  //     price:price,
  //     inStock:inStock,
  //     image:image
  //   })
  //   console.log(result)
  // }


    const product = {title,price,desc,image}
    const handleUpdate =  (id) => {
      updateProduct(id,product,dispatch)
      console.log(product)
    }


  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Ürün</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={products.img} alt="" className="productInfoImg" />
            <span className="productName">{products.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{products._id}</span>
            </div>
            {/* <div className="productInfoItem">
              <span className="productInfoKey">Stokta:</span>
              <span className="productInfoValue">{products.inStock}</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="productBottom">
          <div className="productFormLeft">
            <label>Adı</label>
            <input type="text" placeholder={products.title} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label>Açıklama</label>
            <input type="text" placeholder={products.desc} value={desc} onChange={(e) => setDesc(e.target.value)}/>
            <label>Fiyat</label>
            <input type="text" placeholder={products.price} value={price} onChange={(e) => setPrice(e.target.value)}/>
            <label>Stokta</label>
            {/* <select name="inStock" id="idStock" value={inStock} onChange={(e) => setInStock(e.target.value)}>
              <option value="true">Evet</option>
              <option value="false">Hayır</option>
            </select> */}
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={products.img} alt="" value={image} className="productUploadImg" />
              <label htmlFor="file">
                <span>Ekle</span>
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setImage(e.target.files[0])}/>
            </div>
            <button className="productBtn" onClick={() => handleUpdate(products._id)}>Güncelle</button>
          </div>
      </div>
    </div>
  );
}