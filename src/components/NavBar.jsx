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
  Icon,
  Box,
} from "@chakra-ui/react";
import { RiLoginBoxLine, RiMenuLine } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiFillControl } from "react-icons/ai";
import Link from "../components/Link";
import NextLink from "next/link";

export default function NavBar() {
  const { user, signOutUser, isLoading } = useContext(AuthContext);

  const isLogged = !isLoading && user;
  const isNotLogged = !isLoading && !user;

  return (
<Box
  as="nav"
  py={{ base: 3, md: 5 }}
  px={{ base: 4, md: 10 }}
  fontSize={{ base: "12px", md: "16px", lg: "18px" }}
>
  <Flex
    justifyContent={"space-between"}
    alignItems="center"
    wrap="wrap"
    // maxW="1440px"
    mx="auto"
  >
    <HStack alignItems="center">
      <Link href="/">
        <Image src="/Logo.svg" alt="Logo" />
        <Text
          fontSize={{ base: "13px", md: "17px", lg: "19px" }}
          fontWeight={700}
          marginLeft={{ base: 2, md: 4 }}
        >
          Quimera
        </Text>
      </Link>
    </HStack>

    <HStack
      spacing={5}
      display={{ base: "none", md: "flex" }}
      fontWeight={700}
    >
      <Link href="/inicio">
        <Text _hover={{ borderBottom: "3px solid #6FBE5E" }}>
          Início
        </Text>
      </Link>

      <Link href="/produtos?page=1">
        <Text _hover={{ borderBottom: "3px solid #6FBE5E" }}>
          Produtos
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
            _hover={{
              backgroundColor: "rgba(111,190,94, .9)",
              color: "#fff",
            }}
            _active={{
              backgroundColor: "rgba(111,190,94, .9)",
              color: "#fff",
            }}
            rightIcon={<ChevronDownIcon />}
          >
            {user.email}
          </MenuButton>
          <MenuList>
            {user.permission === "ADMIN" && (
              <MenuItem>
                <NextLink href="/users">Gerenciamento</NextLink>
                <Icon as={RiMenuLine} ml="105px"></Icon>
              </MenuItem>
            )}

            {user.permission === "BRAND" && (
              <MenuItem>
                <NextLink href={`/provider/monitoration/${user.id}`}>
                  Gerenciamento
                </NextLink>
                <Icon as={RiMenuLine} ml="105px"></Icon>
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                signOutUser();
              }}
            >
              Logout
              <Icon as={RiLoginBoxLine} ml="155px"></Icon>
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

          <Link href="/userRegister">
              Cadastre-se
            </Link>
          </>
        )}
      </HStack>
    </Flex>
    </Box>
  );
}
