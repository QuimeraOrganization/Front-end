
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Image,
  FormControl,
  InputRightElement, 
  Text,
  Center,
  Container, 
} from "@chakra-ui/react";


const Cadastro = () => {
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
                          fontSize={{ base: '63px', md: '64px', lg: '66px' }}
                          lineHeight='70px'
                          color='#253C1F'>                    
                                             

                           Venha fazer parte desta <><Text as='span'color='#6FBE5E'>comunidade</Text><br /></> você também!
                        </Text> 
                    </Container>    
                </Center>
            </Box>

            <Box 
             w='720px'
             h='1024px' 
             bg='#F9F9F9'
            >                                               
             
             
            <form>
            <Stack
              spacing={45}                                     
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
                mr="224px"
                ml="225px"
                fontFamily='Nunito Sans' 
                fontStyle='Bold'                                 
                fontSize={{ base: '46px', md: '49px', lg: '50px' }}
                lineHeight='35px'
                Aling='Center'                
                color="#253C1F"
              >                                           
              Cadastre-se
              </Heading>
            </Box> 

            <FormControl >
              <InputGroup >                  
                                    
                <Input
                  w='343px'
                  h='44.74'
                  ml="188px"
                  mr='188px'
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
                  mr='188px'
                  borderRadius={10}
                  borderColor= '#6FBE5E'
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                />
              </InputGroup>

              <InputGroup mt={10}>
                
                <Input
                  w='343px'
                  h='44.74'
                  ml="188px"
                  mr='188px'
                  borderRadius={10}
                  borderColor= '#6FBE5E'
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirme a senha"
                />
                <InputRightElement mr="190px" width="4.5rem" >
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                   {showPassword ? "Esconder" : "Mostrar"}
                  </Button>
                </InputRightElement> 
              </InputGroup>
            </FormControl>
                    
            <FormControl>
              <Button
                ml="188px"
                mr='188px'
                w='343px'
                h='44.74'                    
                borderRadius={10}
                type="submit"
                variant="solid"
                colorScheme="teal"                      
                backgroundColor="#253C1F"
                >
                Cadastrar
              </Button>
            </FormControl> 
          </Stack>
                
        </form>       
                  
      </Box>
      
    </Flex>
  );
};

export default Cadastro;