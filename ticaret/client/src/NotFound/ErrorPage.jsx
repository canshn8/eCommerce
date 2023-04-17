import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import "./errorPage.css"

export default function ErrorPage() {

  const [val, setVal] = useState("")
 

  return (
    <div>
      <Navbar/>
      <div class="errorPage">
        <div class="errorTitle">
            <h1 class="nf">404</h1>
        </div>
        <div class="errorDesc">
            <img width="200px" src="https://i.ibb.co/0M8VG1g/resim-2023-03-03-235914841.png" alt=""/>
            <p class="text">Aradığınız Url Bulunamadı! Lütfen Tekrar Kontrol Edin</p>
        </div>
        <div className="goUrl">
          <label htmlFor="url">Aradğınız URL i Girin</label>
          <input placeholder="URL" value={val} onChange={(e) => setVal(e.target.value)} className="url" type="text" id="url"/>
          <Link to={`/${val}`}>
            <input type="button" className="urlBtn" value="Git"/>
          </Link>
        </div>
        <div class="getBtnDiv">
            <a href="/" class="getBtn">Ana Sayfaya Dön</a>
        </div>
      </div>
    </div>
  )
}
