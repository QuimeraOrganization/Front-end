import { Flex, Image, Text, HStack, Button } from '@chakra-ui/react';
import Link from "../components/Link";

export default function NavBar() {
  return (
    <Flex
      justify="space-between"
      px={10}
      py={5}
    >
      <HStack>
        <Link href="/">
          <Image src="Logo.svg" />
          <HStack>
            <Text
              fontSize={24}
              fontWeight={700}
              marginLeft={4}
            >
              Supermecado SQ
            </Text>
          </HStack>
        </Link>
      </HStack>

      <HStack
        fontWeight={700}
        spacing={5}
      >
        <Link href="/">Início</Link>
        <Link href="/">Sobre</Link>
        <Link href="/">Categorias</Link>
      </HStack>

      <HStack fontWeight={700}>
        <Button
          backgroundColor="#fff"
          color="#6FBE5E"
          border="1px solid #6FBE5E"
          borderRadius={200}
        >
          Entrar
        </Button>

        <Text >ou</Text>

        <Link
          href="/"
          color="#6FBE5E"
        >
          Cadastre-se
        </Link>
      </HStack>

    </Flex>
  );
}