import { HStack, VStack, Image, Heading, Text, Box } from "@chakra-ui/react";

export default function Card({ title, brand, categories, image, ...rest },) {
  return (
    <VStack
      backgroundColor="white"
      margin={2}
      padding={4}
      borderRadius={15}
      minWidth="25%"
      minHeight="30%"
      cursor="pointer"
      {...rest}
    >
      <Box>
        <Image
          src={image || "/Sem-imagem.jpeg"}
          objectFit="scale-down"
          width={["120px", "130px", "140px"]}
          height={["120px", "130px", "140px"]}
          mb={4}
        />
      </Box>

      <VStack
        align="flex-start"
        width="100%"
        height="100%"
        fontSize={{ base: '14px', md: '15px', lg: '16px' }}
      >
        <Heading
          fontSize={{ base: '17px', md: '18px', lg: '19px' }}
        >
          {title}
        </Heading>

        <HStack>
          <Text as="b">Marca: </Text>
          <Text>{brand}</Text>
        </HStack>

        <HStack>
          <Text as="b">Categoria: </Text>
          {
            categories.length > 0 ?
              (categories.map((category) => (
                <Text
                  key={category.category.id}
                  backgroundColor="#253C1F"
                  borderRadius={200}
                  px="5px"
                  color="#FFFFFF"
                >
                  {category.category.name}
                </Text>
              )))
              :
              (
                <Text>Indefinido</Text>
              )
          }
        </HStack>
      </VStack>
    </VStack>
  );
}