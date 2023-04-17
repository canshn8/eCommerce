import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";
import app  from "../../firebase";
import { useState } from "react";
import "./newProduct.css";

export default function NewProduct() {
  const [inputs ,setInputs] = useState({})
  const [file ,setFile] = useState(null)
  const [cat ,setCat] = useState([])
  const [price ] = useState([])
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs((prev)=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  }


  const handleCat = (e) => {
    setCat(e.target.value.split(","))
  }
  
  const handleClick = (e) => {
    e.preventDefault()
    const fileName = new Date().getTime() + file.name
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {...inputs, img:downloadURL, categories:cat};
          addProduct(product, dispatch)
        });
      }
    );

  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Yeni Ürün</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Resim</label>
          <input type="file" id="file"  onChange={(e)=>setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Adı</label>
          <input name="title" type="text" minLength={3} placeholder="Adı" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Açıklama</label>
          <input name="desc" type="text" minLength={3} placeholder="Açıklama" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Renk</label>
          <input name="color" type="text" placeholder="Renk" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Beden</label>
          <input name="size" type="text" placeholder="Beden" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Kategori</label>
          <input type="text" minLength={5} placeholder="Erkek, Laptop" onChange={handleCat}/>
        </div>
        <div className="addProductItem">
          <label>Fiyat</label>
          <input name="price" type="number" minLength={2} placeholder="100 TL" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Stok</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Evet</option>
            <option value="false">Hayır</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">Oluştur</button>
      </form>
    </div>
  );
}