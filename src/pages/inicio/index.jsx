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
  Stack
} from "@chakra-ui/react";


const Login = () => {
  
  

  return (
    <Flex
    
      flexDirection="column"
      width="full"
      height="full"
      justifyContent="center"
      alignItems="center"
      
     >
       <Flex 
       mr='120px'
       ml='120px'
       my='7'

       display={{md: 'flex' }}
       
      >        
      <Box 
       w={{ base: 'full', md: 'full', lg: 'full' }}
       mr='30px'
       
       
       >
            
                       
        <Text                                     
           
          fontFamily='Nunito Sans' 
          fontStyle='Bold'
          fontWeight='25'                                  
          fontSize={{ base: '20px', md: '20px', lg: '25px' }}
          lineHeight='30px'
          Aling='Center' 
          justifyContent="center"               
          color="#253C1F"
          >                                           
          {" "}
              <>
                <Text as="span" color="#6FBE5E" fontSize='7xl' textShadow='3px 2px #253C1F' m='2' >
                  S
                </Text>
               
              </>omos o time Quimera, formandos do curso de Desenvolvimento Full Stack, do programa Academy Bootcamp do Atlântico. A ideia de um sistema de gerenciamento de alimentos e composições alimentares, surgiu diante de um contexto crescente de alergia alimentar na população, principalmente em crianças.{" "}
        </Text>     
        <Text
          my='5' 
          fontFamily='Nunito Sans' 
          fontStyle='Bold'
          fontWeight='20'                                 
          fontSize={{ base: '20px', md: '20px', lg: '25px' }}
          lineHeight='30px'
          Aling='Center' 
          justifyContent="center" 
          color="#253C1F" >
           {" "}
              <>
                <Text as="span" color="#6FBE5E" fontSize='7xl' textShadow='3px 2px #253C1F' m='2'>
                  E
                </Text>
               
              </>sse sistema é empenhado em suprir, as necessidade e carências de pessoas alérgicas, desenvolvendo informações sobre produtos alimentícios e suas composições, sempre focando na eficiência e qualidade dos serviços prestados, a fim de oferecer o melhor para este público com necessidades diferenciadas, sempre buscando a melhoria da qualidade de vida das pessoas.
        </Text>  
        
      </Box>
      
      <Box 
        w={{ base: 'full', md: 'full', lg: 'full' }}
       
        
         >  
                                                                           
                        
            <Image 
              w='full'
              h='340px'                                    
              src="e.jpg" 
              alt='Logotipo da empresa'  
              borderRadius='10'
              boxShadow='dark-lg'                                    
            />     
               
     
                  
      </Box>
           
      </Flex> 

      <Divider
        display={{md: 'flex' }}
        w={{ base: 'full', md:'full', lg: 'full' }}
        my="7"
        borderColor="#6FBE5E"
      />                       


        
      
      <Flex
       mr='120px'
       ml='120px'
       my='8' 
       display={{md: 'flex' }}
        >
      <Box 
      
       mr='50px'
       w={{ base: 'full', md: 'full', lg: 'full' }}
       h='full'
       mb='3'
       boxShadow='dark-lg'   
       borderRadius='10'
      >
        <Center>
        <Heading
          textShadow='2px 1px #253C1F' m=''
          fontFamily='Nunito Sans' 
          fontStyle='Bold'                                 
          fontSize={{ base: '30px', md: '32px', lg: '35px' }}
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
            fontSize={{ base: '18px', md: '20px', lg: '25px' }}
            lineHeight='30px'
            color='#253C1F'>                             

            Proporcionar aos nossos clientes informações e uma vida livre de alergia.   
          </Text> 
        
      </Box>
     

      <Box 
      mr='50px'
       w={{ base: 'full', md: 'full', lg: 'full' }} 
       h='full'
       mb='3'
       boxShadow='dark-lg'   
       borderRadius='10'
       >
        <Center>
        <Heading 
          textShadow='2px 1px #253C1F' m=''
          fontFamily='Nunito Sans' 
          fontStyle='Bold'                                 
          fontSize={{ base: '30px', md: '32px', lg: '35px' }}
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
            fontSize={{ base: '18px', md: '20px', lg: '25px' }}
            lineHeight='30px'
            color='#253C1F'>                             
            Que o Sistema seja sinônimo de informações de confiança, preocupado com a saúde e futuro das pessoas.
          </Text> 
        
      </Box>
    
      <Box 
      
     
      w={{ base: 'full', md: 'full', lg: 'full' }}
      h='full'
      boxShadow='dark-lg'   
      borderRadius='10' 
      >
        <Center>
        <Heading 
          textShadow='2px 1px #253C1F' m=''
          fontFamily='Nunito Sans' 
          fontStyle='normal'                                 
          fontSize={{ base: '30px', md: '32px', lg: '35px' }}
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
            fontSize={{ base: '18px', md: '20px', lg: '25px' }}
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