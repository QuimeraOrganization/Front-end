import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  Select
} from "@chakra-ui/react";
import { useState } from "react";
import { Input } from "../../components/Form/Input";
import { createFeedback } from "../../services/feedbackService";
import Router from "next/router";
import Link from "next/link";
import SideBar from "../../components/SideBar/index";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

export default function FeedbackList() {
  const [product, setProduct] = useState(" ");
  const [content, setContent] = useState(" ");  
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
        await createFeedback(product, content);
        toast.success("Comentário cadastrado com sucesso!", {
          autoClose: 2000,
        });
        Router.push("/feedbacks");     
    } catch (err) {     
      if (!product) {
        toast.error("Nome do produto obrigatório", {
          autoClose: 2000,
        });
      }
      if (!content) {
        toast.error("Conteúdo do feedback obrigatório", {
          autoClose: 2000,
        });
      }
    }

    setError(false);    
  };
  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box
          width="1010px"
          //  height="700px"
          marginLeft="50px"
          flex="1"
          borderRadius={8}
          bg="#F2F1F1"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="700">
            Criar Comentário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">

            
            <Select  placeholder='Produto'>
              <option value='option1'>Produto 1</option>
              <option value='option2'>Produto 2</option>
              <option value='option3'>Produto 3</option>
            </Select>

              <Input
                name="product"
                type="text"
                label="Produto"
                onChange={(e) => setProduct(e.target.value)}
              />
              <Input
                name="content"
                type="text"
                label="Comentário"
                onChange={(e) => setContent(e.target.value)}
              />
            </SimpleGrid>          
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" bg="grey" color="#ffffff">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                onClick={handleSubmit}
                bg="#6FBE5E"
                _hover={{ bg: "green.400" }}
                color="#ffffff"
              >
                Cadastrar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

/*
export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  const token = cookies["nextauth.token"];
 
  if (!token) {
    return {
      redirect: {
        destination: "/produtos?page=1",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
  
}

*/