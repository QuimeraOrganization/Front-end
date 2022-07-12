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
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Input } from "../../../components/Form/Input";
import SideBar from "../../../components/SideBar";
import { getUserById, updateUser } from "../../../services/userService";
import { toast } from "react-toastify";

export default function EditUser({ userId }) {
  const [user, setUser] = useState({ email: "", permission: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    getUserById(userId).then(({ email, permission, password }) => {
      setUser({
        email,
        permission,
        password,
      });
    });
  }, []);
  console.log({ user });
  const handleUpdateUser = async () => {
    try {
      if (confirmPassword === user.password) {
        await updateUser(userId, user.email, user.password, user.permission);
      }

      toast.success("Usuário atualizado com sucesso", {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(user.password);
      if (!user.email) {
        toast.error("Email obrigatório!", {
          autoClose: 2000,
        });
      }
      if (!user.password) {
        toast.error("Senha obrigatória!", {
          autoClose: 2000,
        });
      }
      if (user.password.length > 16) {
        toast.error("Password deve ter no máximo 16 caracteres!", {
          autoClose: 2000,
        });
      }
    }
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
            Editar Usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                value={user.email}
                name="email"
                type="email"
                label="E-mail"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <Input
                value={user.permission}
                name="permission"
                type="text"
                label="Permission"
                onChange={(e) =>
                  setUser({ ...user, permission: e.target.value })
                }
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                value={user.password}
                name="password"
                type="password"
                label="Senha"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <Input
                name="passoword_confirmation"
                type="password"
                label="Confirmação da senha"
                // focusBorderColor={error ? "red" : "#6FBE5E"}
                //  borderColor={error ? "red" : "#6FBE5E"}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              <Button bg="#6FBE5E" color="#ffffff" onClick={handleUpdateUser}>
                Salvar
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
  //se não existir o token, ele redireciona para a pag index.
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  console.log(context.query.id);
  return {
    props: {
      userId: context.query.id,
    }, // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}
