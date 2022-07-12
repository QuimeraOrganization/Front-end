import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Link,
  Image,
  FormControl,
  InputRightElement, 
  Text,
  Center,
  Container,
} from "@chakra-ui/react";


const Login = () => {
  
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column, row"
      display={{md: 'flex' }}
      width="100wh"
      height="full"
      justifyContent="center"
      alignItems="center"
      
     >

      <Box 
        w='720px'
        h='1024px' 
        bg='#F9F9F9'
       >  
                                                         
        <form>
          <Stack
             
            
            spacing={67}                                     
           >
             
            <Image
              mt={130} 
              mr="239px"
              ml="239px"                                             
              src="Logo.svg" 
              alt='Logotipo da empresa'                                        
            />     
                    
            <Box>                
              <Heading                                           
                mr="285px"
                ml="284px"  
                fontFamily='Nunito Sans' 
                fontStyle='Bold'                                 
                fontSize={{ base: '46px', md: '48px', lg: '50px' }}
                lineHeight='20px'
                Aling='Center'                
                color="#253C1F"
               >                                           
                Login 
              </Heading>
            </Box>

            <FormControl >
              <InputGroup >                                                              
                <Input
                  w='343px'
                  h='44.74'
                  ml="188px"
                  borderRadius={10}
                  borderColor= '#6FBE5E'
                  type="email" placeholder="E-mail" 
                />
              </InputGroup>
            </FormControl>
              
            <FormControl>
              <InputGroup>                
                <Input
                  w='343px'
                  h='44.74'
                  ml="188px"
                  borderRadius={10}
                  borderColor= '#6FBE5E'
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                />

                <InputRightElement mr="190px" width="4.5rem" >
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                   {showPassword ? "Esconder" : "Mostrar"}
                  </Button>
                </InputRightElement>
              </InputGroup>
               
              {/*<FormHelperText 
                mt={2}
                ml="180px" 
                textAlign="center">
                <Link>Esqueci minha senha</Link>
              </FormHelperText>
              */}
              
            </FormControl>
                    
            <FormControl>
              <Button
                ml="188px"
                w='343px'
                h='44.74'                    
                borderRadius={10}
                type="submit"
                variant="solid"
                colorScheme="teal"                      
                backgroundColor="#253C1F"
                >
                Entrar
              </Button>
            </FormControl> 
          </Stack>
             
           
          <Box 
           w='343px'
           h='44.74'
           ml="210px"
           mt={4}
           >                              
           Não tem uma conta ainda?{" "}
            <Link color="#6FBE5E" href="#">
             Cadastre-se
            </Link>
          </Box> 
                
        </form>       
                  
      </Box>
           
            
      <Box 
       w='720px'
       h='1024px' 
       bg='#FFFFFF'>
            
        <Center 
         mt={302}  
         mr="160px"
         ml="155px"        
         >
          <Container>         
            <Text                                                                      
             fontFamily='Nunito Sans' 
             fontStyle='normal'
             fontWeight='700'                     
             fontSize={{ base: '62px', md: '63px', lg: '65px' }}
             lineHeight='70px'
             color='#253C1F'>                             

            Saiba quias <><Text as='span'color='#6FBE5E'>ingredientes</Text><br/></>tem em cada alimento e consuma com <><Text as='span'color='#6FBE5E'>segurança</Text></>.
              
            </Text> 


          </Container>    
        </Center>
      

      </Box>
      
    </Flex>
  );
};

export default Login;