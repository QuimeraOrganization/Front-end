import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { Input } from "../../components/Form/Input";
import { createCategory } from "../../services/categoryService";
import Router from "next/router";
import Link from "next/link";
import SideBar from "../../components/SideBar/index";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

export default function UserList() {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      await createCategory(name);
      toast.success("Categoria cadastrada com sucesso!", {
        autoClose: 2000,
      });
      Router.push("/categories");
    } catch (err) {
      if (!name) {
        toast.error("O campo Nome é obrigatório!", {
          autoClose: 2000,
        });
      }
    }

    setName("");
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
            Criar Categoria
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                name="category"
                type="text"
                label="Nome"
                onChange={(e) => setName(e.target.value)}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/categories" passHref>
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
