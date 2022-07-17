import React from 'react';
import { useRouter } from 'next/router';
import { Button, onClose } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/ModalFeedback.jsx'
import ModalFeedback from '../components/ModalFeedback.jsx';



export default function HomeAdmin() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJuYXRoZXJjaWEyQGdtYWlsLmNvbSIsInBlcm1pc3Npb24iOiJBRE1JTiIsImlhdCI6MTY1NzU2MjQ2OSwiZXhwIjoxNjU3NjQ4ODY5fQ.0SrVGxTrz4vw1I2XC7-_X45CUWODO6MdvTWDGyoy0DU"

  const [comentarios, setComentarios] = useState([]);
  const [visibleTable, setVisibleTable] = useState("none");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const buscarComentarios = async () => {

      const resultado = await axios.get('http://localhost:3333/feedbacks',  
        { headers: {"Authorization": `token ${token}`}});

      setComentarios(resultado.data);
    }
    buscarComentarios();
  }, []);
 

  return (
    <>
      <Button backgroundColor="#253C1F" color="#FFF" mr={3} onClick={() => setVisibleTable(" ")}>
        Comentários
      </Button>

      <TableContainer style={{display: visibleTable}}>
        <Table size='md'>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>

            {comentarios.map((comentario) => {
              return (
                <Tr key={comentario.id}>
                  <Td>Comentário: {comentario.contents}</Td>
                  <Td>id: {comentario.id}</Td>
                  <Td><Button>Editar</Button></Td>
                  <Td><Button>Excluir</Button></Td>
                </Tr>
              )
            })}

          </Tbody>
        </Table>
      </TableContainer>

      <ModalFeedback isVisible={isModalVisible}></ModalFeedback>

    </>
  )
}


