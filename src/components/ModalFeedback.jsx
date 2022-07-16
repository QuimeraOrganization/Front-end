import { useDisclosure } from '@chakra-ui/react'
import React, {useState} from 'react';

import { Box, Text, Select, Textarea, FormLabel, FormControl, Input, Stack, Center, Button, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, } from '@chakra-ui/react'


export default function ModalFeedback({isVisible}) {
  console.log('isVisible: ', isVisible);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [firstName, setFirsName] = useState("Your Name");

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal size={'5xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Center>
            <ModalHeader> Editar Comentário </ModalHeader>
          </Center>          
          <ModalCloseButton />
          <ModalBody>

            <FormControl>
              <FormLabel>Nome Usuario</FormLabel>
              <Input placeholder='First Name' onChange={(event) => setFirsName(event.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Comentário</FormLabel>
              <Textarea placeholder='Here is a sample placeholder' />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Selecione um produdo</FormLabel>
            <Select placeholder='Selecione um produto'>
              <option value='option1'>Produto 1</option>
              <option value='option2'>Produto 2</option>
              <option value='option3'>Produto 3</option>
            </Select>
            </FormControl>
          </ModalBody>

          <Center>
          <ModalFooter>
              <Button backgroundColor="#253C1F" color="#FFF" mr={3} onClick={onClose}>
                Salvar
               </Button>           
          </ModalFooter>
          </Center>

        </ModalContent>
      </Modal>
    </>
  )
}


