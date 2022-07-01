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
              fontSize={{ base: '12px', md: '16px', lg: '18px' }}
              fontWeight={700}
              marginLeft={4}
            >
              Supermecado SQ
            </Text>
          </HStack>
        </Link>
      </HStack>

      <HStack
        fontSize={{ base: '11px', md: '12px', lg: '13px' }}
        fontWeight={700}
        spacing={5}
      >
        <Link href="/">Início</Link>
        <Link href="/">Sobre</Link>
        <Link href="/">Categorias</Link>
      </HStack>

      <HStack
        fontSize={{ base: '11px', md: '12px', lg: '13px' }}
        fontWeight={700}
      >
        <Button
          height={0}
          fontSize={{ base: '11px', md: '12px', lg: '13px' }}
          backgroundColor="#fff"
          color="#6FBE5E"
          border="1px solid #6FBE5E"
          borderRadius={200}
          padding={3}
          paddingInlineStart={0}
          paddingInlineEnd={0}
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