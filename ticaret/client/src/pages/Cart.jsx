import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../redux/cartRedux";
import StripeCheckout from "react-stripe-checkout";
import Newsletter from "../components/Newsletter";
import { userRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { mobile } from "../responsive";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

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
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
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

const ProductNull = styled.span`
  text-align: center;
  display: flex;
  
`;
const ProductDesc = styled.span``

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  float:right;
  width: 20em;
  padding: 10px;
  border-radius:5px;
  background-color: blue;
  color: white;
  font-weight: 600;
`;

const ButtonDel = styled.button`
  margin:3rem;
  cursor:pointer;
  border-radius:10px 10px 10px 10px;
  background-color: white;
  color: blck;
  height:3rem;
  width:4em;
  &:hover{
    background-color: red;
    color:white;
  }
  
`;


const Cart = () => {
  

  const cart = useSelector((state) => state.cart);
  console.log(cart)
  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch()
  const navigate = useHistory();
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate.push("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);


  const handleDelete = (product) => {
    dispatch(removeProduct(product))
  };




  return (
    <Container>
      <Navbar/>
      <Wrapper>
        <Title>Sepetin</Title>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Ürün:</b> {product.title}
                    </ProductName>
                    <ProductDesc>
                      <b>Açıklama:</b> {product.desc}
                    </ProductDesc>
                  </Details>
                </ProductDetail>
                <ButtonDel onClick={()=>handleDelete(product)}>Temizle</ButtonDel>
              </Product>
            ))}
            <Hr />
          </Info>
          {cart.total === 0 ? 
          <Product>
            <ProductName>Eklenen Ürün Yok</ProductName>
          </Product> 
          :
          <Summary>
            <SummaryTitle>Sipariş Özeti</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>KDV</SummaryItemText>
              <SummaryItemPrice> TL</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Toplam</SummaryItemText>
              <SummaryItemPrice> {cart.total} TL</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="CAN"
              image="https://i.ibb.co/n32CMgf/IMG-20221229-000025-105.jpg"
              billingAddress
              shippingAddress
              description={`Toplam Ücret ${cart.total} TL`}
              amount={cart.total}
              token={onToken}
              stripeKey={KEY}>
              <Button>Şimdi Al</Button>
            </StripeCheckout>
        </Summary>
          }
        </Bottom>
      </Wrapper>
      <Newsletter/>
      <Footer />
    </Container>
  );
};

export default Cart;