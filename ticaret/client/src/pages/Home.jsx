import Newsletter from "../components/Newsletter";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import React from "react";



const Home = () => {
  return (
    <div>
      <Navbar/>
      <Slider />
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
