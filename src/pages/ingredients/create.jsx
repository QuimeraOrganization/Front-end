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
import { createIngredient } from "../../services/ingredientService";
import Router from "next/router";
import Link from "next/link";
import SideBar from "../../components/SideBar/index";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

export default function CreateIngredient() {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      if (name) {
        await createIngredient(name);
        toast.success("Ingrediente cadastrado com sucesso!", {
          autoClose: 2000,
        });
        Router.push("/ingredients");
      } else {
        toast.error("Nome do ingrediente obrigatório!", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        autoClose: 2000,
      });
    }

    setName("");
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
            Criar Ingrediente
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                name="ingredient"
                type="text"
                label="Nome"
                onChange={(e) => setName(e.target.value)}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/ingredients" passHref>
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
