import React from 'react'
import { Link } from 'react-router-dom';
import "./topbar.css";


export default function Topbar() {
  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
              <Link to="/">
                <span className="logo">PROJE</span>
              </Link>
            </div>
        </div>
    </div>
  )
}
