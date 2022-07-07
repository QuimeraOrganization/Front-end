import { HStack, VStack, Image, Heading, Text, Box } from "@chakra-ui/react";

export default function Card({ title, brand, categories, image }) {
  return (
    <VStack
      backgroundColor="white"
      margin={2}
      padding={4}
      borderRadius={15}
      minWidth="20%"
      cursor="pointer"
    >
      <Box>
        <Image
          src={image}
          objectFit="scale-down"
          width={["80px", "90px", "100px"]}
          height={["80px", "90px", "100px"]}
          mb={4}
        />
      </Box>

      <VStack
        align="flex-start"
        width="100%"
        height="100%"
        fontSize={{ base: '10px', md: '11px', lg: '12px' }}
      >
        <Heading
          fontSize={{ base: '14px', md: '15px', lg: '16px' }}
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