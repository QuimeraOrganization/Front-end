import {
  Flex,
  Image,
  Text,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import Link from "../components/Link";
import NextLink from "next/link";

export default function NavBar() {
  const { user, signOutUser, isLoading } = useContext(AuthContext);

  const isLogged = !isLoading && user;
  const isNotLogged = !isLoading && !user;

  return (
    <Flex justify="space-between" px={10} py={5}>
      <HStack>
        <Link href="/">
          <Image src="Logo.svg" />
          <HStack>
            <Text
              fontSize={{ base: "12px", md: "16px", lg: "18px" }}
              fontWeight={700}
              marginLeft={4}
            >
              Supermecado SQ
            </Text>
          </HStack>
        </Link>
      </HStack>

      <HStack
        fontSize={{ base: "11px", md: "12px", lg: "13px" }}
        fontWeight={700}
        spacing={5}
      >
        <Link href="/">
          <Text fontSize="15px" _hover={{ borderBottom: "3px solid #6FBE5E" }}>
            Ínicio
          </Text>
        </Link>

        <Link href="/">
          <Text fontSize="15px" _hover={{ borderBottom: "3px solid #6FBE5E" }}>
            Produtos
          </Text>
        </Link>
        <Link href="/">
          <Text fontSize="15px" _hover={{ borderBottom: "3px solid #6FBE5E" }}>
            Categorias
          </Text>
        </Link>
      </HStack>

      <HStack
        fontSize={{ base: "11px", md: "12px", lg: "13px" }}
        fontWeight={700}
      >
        {isLoading && <Skeleton height="40px" width="240px" />}

        {isLogged && (
          <Menu>
            <MenuButton
              backgroundColor="transparent"
              _hover={{ backgroundColor: "rgba(111,190,94, .9)", color: "#fff" }}
              _active={{ backgroundColor: "rgba(111,190,94, .9)", color: "#fff" }}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {user.email}
            </MenuButton>
            <MenuList>
              {user.permission === "ADMIN" && (
                <MenuItem>
                  <NextLink href="/users">Monitoramento</NextLink>
                </MenuItem>
              )}
              {user.permission === "BRAND" && (
                <MenuItem>
                  <NextLink href={`/provider/monitoration/${user.id}`}>
                    Monitoramento
                  </NextLink>
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  signOutUser();
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}

        {isNotLogged && (
          <>
            <NextLink href="/login">
              <Button
                height={0}
                fontSize={{ base: "11px", md: "12px", lg: "13px" }}
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
            </NextLink>
            <Text>ou</Text>

            <Link href="/userRegister" color="#6FBE5E">
              Cadastre-se
            </Link>
          </>
        )}
      </HStack>
    </Flex>
  );
}
