import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
  cursor: pointer;
  ${mobile({ height: "20vh" })}
`;


const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  transition: all 0.5s ease;
  background-color: #f5fbfd;
  &:hover ${Title} {
    opacity: 1;
    color:black;
  }
`;


const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
`;


const Button = styled.button`
    border:none;
    border-radius: 10px 10px 1px;
    padding: 10px;
    background-color: white;
    color:black;
    cursor: pointer;
    font-weight: 900;
    &:hover ${Container} {
      opacity: 0.5;
    }
`;

const CategoryItem = ({ item }) => {
  
  return (
    <Container name="kategori">
      <Link to={`/products/${item.cat}`}>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>Şimdi Gör</Button>
      </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
