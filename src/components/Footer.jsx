import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  } from "@chakra-ui/react";
import { useContext } from "react";
  import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
  import Link from "../components/Link";
import { AuthContext } from "../context/AuthContext";
  
  export default function Footer() {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const {isAuthenticated} = useContext(AuthContext);

  return (
  <Flex
    direction={isMobile ? "column" : "row"}
    bg="#6FBE5E"
    justifyContent={"space-between"}
    align="stretch"
    color="#FFFFFF"
    as="footer"
    py="4"
    paddingRight={"2rem"}
    paddingLeft={"2rem"}
  >
        {isMobile ?
        <>
        
  <Stack width="200" >
          <Text  display={"flex"} alignItems={"center"} justifyContent={"center"} mt={"1rem"} fontSize="lg" fontWeight="bold">
            Páginas
          </Text>
      <Stack  display={"flex"} flexDir={"row"} alignItems={"center"} justifyContent={"center"} gap={"6rem"} mt={"1rem"}>
        <Link href="/inicio">
          <Button variant="link" color="white" size="sm" fontSize={"1rem"} fontWeight="bold">
            Início
          </Button>
        </Link>
        <Link href="/produtos?page=1">
          <Button variant="link" color="white" size="sm" fontWeight="bold" mb={"0.45rem"}>
            Produtos
          </Button>
        </Link>
      </Stack>
  </Stack> 
  
  <Stack justify={"space-between"} width={"200"} mt={"2rem"}>
    
      <Stack  display={"flex"} flexDir={"row"}  align="center" justifyContent={"center"} gap={"2rem"}>
            <Image src="/Logo-white.svg" alt="" mb="4" />
        <Box>
              <Text color="muted" fontSize="sm" fontWeight="bold">
              © Copyright 2022
              </Text>
              <Text color="muted" fontSize="sm" fontWeight="bold">
              All Rights Reserved.
              </Text>

        </Box>
      </Stack>
  </Stack>

</> 
  : 
  <>
  <Stack justify={"space-between"} width={"200"}> 
      <Stack align={"center"} justifyContent={"center"}>
            <Image src="/Logo-white.svg" alt="" mb="4" />
       
              <Text color="muted" fontSize="sm" fontWeight="bold">
              © Copyright 2022
              </Text>
              <Text color="muted" fontSize="sm" fontWeight="bold">
              All Rights Reserved.
              </Text>   
      </Stack>
  </Stack>

  <Stack width="200" >
    <Text fontSize="lg" fontWeight="bold">
      Páginas
    </Text>
    <Stack spacing="3" shouldWrapChildren>
      <Link href="/inicio">
        <Button variant="link" color="white" size="sm" fontWeight="light">
          Início
        </Button>
      </Link>
      <Link href="/produtos?page=1">
        <Button variant="link" color="white" size="sm" fontWeight="light">
          Produtos
        </Button>
      </Link>
    </Stack>
  </Stack>
  </>
  
  }

  {isAuthenticated ? "" : <Stack direction={"row"} alignItems={"center"} justifyContent={ 'center'} width={"200"} gap={"3rem"}>
   
   {/* {isMobile ? <Box>
   <Text fontSize="lg" fontWeight="bold">
     Páginas
   </Text>
   <Stack spacing="3" shouldWrapChildren>
     <Link href="/inicio">
       <Button variant="link" color="white" size="sm" fontWeight="light">
         Início
       </Button>
     </Link>
     <Link href="/produtos?page=1">
       <Button variant="link" color="white" size="sm" fontWeight="light">
         Produtos
       </Button>
     </Link>
   </Stack>
   </Box> : "" 
   } */}
   
 {isMobile || isAuthenticated ? "" : <Stack width="200" mb={"3.2rem"}>
   <Text fontSize="lg" fontWeight="bold">
     Sua conta
   </Text>
   <Stack spacing="3" shouldWrapChildren>
     <Link href="/userRegister">
       <Button variant="link" color="white" size="sm" fontWeight="light">
         Cadastre-se
       </Button>
     </Link>
     <Link href="/login">
       <Button variant="link" color="white" size="sm" fontWeight="light">
         Entrar
       </Button>
     </Link>
   </Stack>
</Stack> 
 }

  
 </Stack>}

{isMobile ? "" : <Stack direction="column" width="200">
        <Text fontSize="lg" fontWeight="bold">
          Social media
        </Text>
        <ButtonGroup variant="link">
          <IconButton
            as="a"
            href="https://www.facebook.com/eros.linnyker/"
            aria-label="Facebook"
            color="white"
            icon={<FaFacebook fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="https://www.instagram.com/"
            color="white"
            aria-label="Instagram"
            icon={<FaInstagram fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="https://twitter.com/LinnykerEros"
            color="white"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
        </Stack>
}

 
</Flex>
  );
}
