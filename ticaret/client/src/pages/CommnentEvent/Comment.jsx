import styled from "styled-components";
import { mobile } from "../../responsive";
import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar";
import { getComments } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import {format} from "timeago.js"


const Container = styled.div``

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Table = styled.table`
  justify-content: space-between;
  flex-direction: column;
  margin: auto;
  padding: 100px;
  text-align: center;
  margin-top: 3em;
`

const Th = styled.th`
  font-family: 'Quicksand', sans-serif;
  font-size: 24px;
`
const Tr = styled.tr``

const Td = styled.td`
  font-size: 24px;
  padding: 30px;
  border-radius: 11em;
`
const Inf = styled.span`
  margin:auto;
  margin-top:5em;
  font-size: 24px;
  text-align: center;
  align-items:center;
`

const Button = styled.a`
  border: none;
  background-color: darkcyan;
  color: white;
  font-size:20px;
  height: 2em;
  width: 10em;
  border-radius: 1em;
  position: sticky;
  top:0;
  cursor: pointer;
  align-items:center;
  text-align:center;
`

export default function Comment() {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.comment.comments)

  console.log(messages)
 

  useEffect(() => {
    getComments(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        {messages.total === 0 ?
          <Inf>Henüz Eklenmiş Bir Yorum Yok</Inf>
        :
        <InfoContainer>
          <Table>
            <Th>Yazan</Th>
            <Th>Başlık | Konu</Th>
            <Th>Açıklama</Th>
            <Th>Oluşturma Tarihi</Th>
            <Th>Güncelleme Tarih</Th>
            
            {messages.map((comment) => (
              <Tr>
                <Td>{comment.username}</Td>
                <Td>{comment.title}</Td>
                <Td>{comment.comments}</Td>
                <Td>{format(comment.createdAt)}</Td>
                <Td>{format(comment.updatedAt)}</Td>
              </Tr>
            ))}
          </Table>
        </InfoContainer>
        } 
        <Button href="/newComment">Yeni Yorum Ekle</Button>
      </Wrapper>
    </Container>
  )
}
