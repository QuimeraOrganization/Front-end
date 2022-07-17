import { useState } from "react";
import {
  Flex,
  Heading,
  Box,
  Divider,
  Image,
  Spacer, 
  Text,
  Center,
  Container,
} from "@chakra-ui/react";


const Login = () => {
  
  

  return (
    <Flex
      flexDirection="column"
      display={{md: 'flex' }}
      width="full"
      height="full"
      justifyContent="center"
      alignItems="center"
      
     >
       <Flex my='10' 
        display={{md: 'flex' }}
      >        
      <Box 
       w='720px'
       ml="30px"
       >
            
                       
        <Text                                     
           
          fontFamily='Nunito Sans' 
          fontStyle='Bold'
          fontWeight='25'                                  
          fontSize={{ base: '22px', md: '25px', lg: '27px' }}
          lineHeight='30px'
          Aling='Center' 
          justifyContent="center"               
          color="#253C1F"
          >                                           
          {" "}
              <>
                <Text as="span" color="#6FBE5E" fontSize='6xl'>
                  S
                </Text>
               
              </>omos o time Quimera, formandos do curso de Desenvolvimento Full Stack, do programa Academy Bootcamp do Atlântico. A ideia de um sistema de gerenciamento de alimentos e composições alimentares, surgiu diante de um contexto crescente de alergia alimentar na população, principalmente em crianças.{" "}
        </Text>     
        <Text
          my='5' 
         
          fontFamily='Nunito Sans' 
          fontStyle='Bold'
          fontWeight='20'                                 
          fontSize={{ base: '22px', md: '25px', lg: '27px' }}
          lineHeight='30px'
          Aling='Center' 
          justifyContent="center" 
          color="#253C1F" >
           {" "}
              <>
                <Text as="span" color="#6FBE5E" fontSize='6xl' >
                  E
                </Text>
               
              </>sse sistema é empenhado em suprir, as necessidade e carências de pessoas alérgicas, desenvolvendo informações sobre produtos alimentícios e suas composições, sempre focando na eficiência e qualidade dos serviços prestados, a fim de oferecer o melhor para este público com necessidades diferenciadas, sempre buscando a melhoria da qualidade de vida das pessoas.
        </Text>  
        
      </Box>
      
      <Box 
        w='720px'
         >  
                                                                           
                        
            <Image
              ml="30px"                                       
              src="e.jpg" 
              alt='Logotipo da empresa'  
              borderRadius='10'
              boxShadow='dark-lg'                                    
            />     
               
     
                  
      </Box>
           
      </Flex> 

      <Divider
        w="full"
        my="1"
        borderColor="#6FBE5E"
      />                       

<Flex
        my='5' 
        display={{md: 'flex' }}
      >
      <Box 
       ml="110px"
       w='500px' 
       h='210px'
       boxShadow='dark-lg'   
       borderRadius='10'
      >
        <Center>
        <Heading
          
          fontFamily='Nunito Sans' 
          fontStyle='normal'                                 
          fontSize={{ base: '30px', md: '32px', lg: '34px' }}
          lineHeight='50px'
          Aling='Center' 
          justifyContent="center"               
          color="#6FBE5E"
           >
            Missão
            </Heading>
            </Center>

          <Text 
          ml='4'
          mr='4'                                                                     
            fontFamily='Nunito Sans' 
            fontStyle='normal'
            fontWeight='20'                     
            fontSize={{ base: '18px', md: '20px', lg: '22px' }}
            lineHeight='30px'
            color='#253C1F'>                             

            Proporcionar aos nossos clientes informações e uma vida livre de alergia.   
          </Text> 
        
      </Box>
      <Spacer />

      <Box 
       ml="110px" 
       w='500px' 
       h='210px'
       boxShadow='dark-lg'   
       borderRadius='10'
       >
        <Center>
        <Heading 
          fontFamily='Nunito Sans' 
          fontStyle='Bold'                                 
          fontSize={{ base: '30px', md: '32px', lg: '34px' }}
          lineHeight='50px'
          Aling='Center' 
          justifyContent="center"               
          color="#6FBE5E"
          >
  
            Visão
            </Heading> 
            </Center>
           <Text
              ml='4'
              mr='4'                                                                    
            fontFamily='Nunito Sans' 
            fontStyle='normal'
            fontWeight='20'                     
            fontSize={{ base: '18px', md: '20px', lg: '22px' }}
            lineHeight='30px'
            color='#253C1F'>                             
            Que o Sistema seja sinônimo de informações de confiança, preocupado com a saúde e futuro das pessoas.
          </Text> 
        
      </Box>
      <Spacer />
      <Box 
      ml="110px"
      w='500px' 
      h='210px'
      boxShadow='dark-lg'   
      borderRadius='10' 
      >
        <Center>
        <Heading 
          fontFamily='Nunito Sans' 
          fontStyle='normal'                                 
          fontSize={{ base: '30px', md: '32px', lg: '34px' }}
          lineHeight='50px'
          Aling='Center' 
          justifyContent="center"               
          color="#6FBE5E"
          >
  
            Valores
        </Heading>
        </Center>
          <Text  
             ml='4'
             mr='4'                                                                  
            fontFamily='Nunito Sans' 
            fontStyle='normal'
            fontWeight='10'                     
            fontSize={{ base: '18px', md: '20px', lg: '22px' }}
            lineHeight='30px'
            color='#253C1F'>                             
             Embasamento Técnico e Científico, Transparência, Inovação, Valorização do ser humano, Ambiente acolhedor e de ajuda mútua, Preocupação com o futuro das pessoas.
          </Text> 
       
      </Box>


      </Flex> 







    </Flex>
  );
};

export default Login;