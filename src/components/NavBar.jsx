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
    <Flex
      justify="space-between"
      px={10}
      py={5}
      fontSize={{ base: "12px", md: "16px", lg: "18px" }}
      wrap="wrap"
    >
      <HStack>
        <Link href="/">
          <Image src="/Logo.svg" />
          <HStack>
            <Text
              fontSize={{ base: "13px", md: "17px", lg: "19px" }}
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
              fontSize={{ base: "12px", md: "16px", lg: "18px" }}
              backgroundColor="transparent"
              _hover={{
                backgroundColor: "rgba(111,190,94, .9)",
                color: "#fff",
              }}
              _active={{
                backgroundColor: "rgba(111,190,94, .9)",
                color: "#fff",
              }}
              as={Button}
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

            <Link href="/userRegister" color="#6FBE5E">
              Cadastre-se
            </Link>
          </>
        )}
      </HStack>
    </Flex>
  );
}
