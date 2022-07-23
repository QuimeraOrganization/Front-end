import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  Select,
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
  const [productId, setProductId] = useState(" ");
  const [userId, setUserId] = useState(" ");
  const [contents, setContents] = useState(" ");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      if (contents && productId && userId) {
        await createFeedback(contents, productId, userId);
        toast.success("Comentário cadastrado com sucesso!", {
          autoClose: 2000,
        });
        Router.push("/feedbacks");
      }
    } catch (err) {
      toast.error("Verifique os campos e tente novamente!", {
        autoClose: 2000,
      });

      if (!contents) {
        toast.error("Conteúdo do comentário obrigatório", {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <Box minHeight="calc(100vh - 90px - 183px)">
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
              <Input
                name="product"
                type="number"
                label="Produto ID"
                onChange={(e) => setProductId(e.target.value)}
              />
              <Input
                name="product"
                type="number"
                label="User ID"
                onChange={(e) => setUserId(e.target.value)}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                name="content"
                type="text"
                label="Comentário"
                onChange={(e) => setContents(e.target.value)}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/feedbacks" passHref>
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
