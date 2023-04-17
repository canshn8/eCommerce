import Newsletter from "../components/Newsletter";
import { useHistory } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { removeFavori } from "../redux/cartRedux";
import { useState } from "react";



const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;


const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
  background-color: #ffff;
  transition: all 0.5s ease;
  cursor: pointer;
`;


const Container = styled.div`
&:hover ${Info}{
    opacity: 1;
  }
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: #e9f5f5;
    transform: scaleY(1.1);
  }
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;
const ProductDesc = styled.span``;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const ButtonDel = styled.button`
  margin:3rem;
  cursor:pointer;
  border-radius:10px 10px 10px 10px;
  background-color: white;
  color: blck;
  height:3rem;
  width:4%;
  &:hover{
    background-color: red;
    color:white;
  }
  
`;


const Favorites = () => {
    const favorite = useSelector((state) => state.cart);
    const dispatch = useDispatch()

    const handleDelete = (product) => {
      dispatch(removeFavori(product))
    };

    return (
        <Container>
        <Navbar/>
          <Wrapper>
            <Title>Favorilerin</Title>
              <Bottom>
                <Info>
                  {favorite.favorites.map((product) => (
                    <Product key={product}>
                      <ProductDetail>
                        <Image src={product.img} />
                        <Details>
                        <ProductName><b>Ürün:</b> {product.title}</ProductName>
                        <ProductDesc><b>Açıklama:</b> {product.desc}</ProductDesc>
                        </Details>
                      </ProductDetail>
                      <ButtonDel onClick={()=>handleDelete(product)}>Sil</ButtonDel>
                      </Product>
                  ))}
                  <Hr />
              </Info>
            </Bottom>
          </Wrapper>
          <Newsletter />
          <Footer />
        </Container>
    );
};

export default Favorites;