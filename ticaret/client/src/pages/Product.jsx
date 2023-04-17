import { AiOutlinePlus} from "react-icons/ai";
import {  publicRequest} from "../requestMethods";
import Newsletter from "../components/Newsletter";
import { addProduct, addFavorite } from "../redux/cartRedux";
import { useHistory, useLocation} from "react-router-dom";
import { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { mobile } from "../responsive";
import { IoIosRemove } from "react-icons/io";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
font-weight: ${(props) => props.type === "total" && "130"};
font-size: ${(props) => props.type === "total" && "24px"};
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid #3586ff;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {

  const LoggedIn = useSelector((state) => state.user?.isLoggedIn);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const navigate = useHistory()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);


  const handleQuantity = (type) => {
    if(type === "dec"){
      quantity > 1 && setQuantity(quantity - 1)
    }else{
     setQuantity(quantity + 1) 
    }
  }


  const handleClick = () => {
    if(LoggedIn===true){
      dispatch(addProduct({...product, quantity, color, size}));
    }
    else{
      alert("Lütfen Giriş Yapmayı Deneyin")
      navigate.push(`/product/${id}`)
    }
  }
  
  const handleFavorite = () => {
    if(LoggedIn===true){
      dispatch(addFavorite({...product}));
    }
    else{
      alert("Lütfen Giriş Yapmayı Deneyin")
      navigate.push(`/product/${id}`)
    }
  }

  

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price> {product.price} TL</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Renk</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Beden</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <IoIosRemove onClick={() => handleQuantity("dec")}/>
              <Amount type="total">{quantity}</Amount>
              <AiOutlinePlus onClick={() => handleQuantity("inc")}/>
            </AmountContainer>
            <Button onClick={handleFavorite}>Favorilere Ekle</Button>
            <Button onClick={handleClick}>Karta Ekle</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter/>
      <Footer />
    </Container>
  );
};

export default Product;
