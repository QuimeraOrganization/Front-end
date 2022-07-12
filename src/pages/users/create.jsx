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
import { Input } from "../../components/Form/Input";
import SideBar from "../../components/SideBar/index";
import { createUser } from "../../services/userService";
export default function UserList() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [confirmPassowrd, setConfirmPassowrd] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (confirmPassowrd === password) {
      await createUser(email, password, permission);
      Router.push("/");
    } else {
      setError(true);
    }
    setError(false);
    setEmail("");
    setPassword("");
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
            Criar Usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                name="email"
                type="email"
                label="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                name="permission"
                type="permission"
                label="Permission"
                onChange={(e) => setPermission(e.target.value)}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                name="passoword_confirmation"
                type="password"
                label="Confirmação da senha"
                // focusBorderColor={error ? "red" : "#6FBE5E"}
                borderColor={error ? "red" : "#6FBE5E"}
                onChange={(e) => setConfirmPassowrd(e.target.value)}
              />
            </SimpleGrid>
            {error ? <p>"Verifique a senha!"</p> : ""}
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
