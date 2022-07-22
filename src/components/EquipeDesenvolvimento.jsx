import {
  Flex,
  Heading,
  Box,
  Divider,
  Image,
  Text,
  Center,
  HStack,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Icon,
} from "@chakra-ui/react";

export default function EquipeDesenvolvimento({
  imageProfile,
  name,
  linkGit,
  linkLinkedin,
}) {
  return (
    <Box
      // width="343px"
      flexDirection="column"
      borderRadius={20}
      color="#1c1c1c"
      padding="20px"
      _hover={{ transform: "scale(1.1)", transition: "all 0.5s" }}
    >
      <Image
        width="120px"
        height="120px"
        ml="15px"
        mb="10px"
        borderRadius={10}
        margin="0 auto"
        src={imageProfile}
      />

      <Text
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb="10px"
        mt="10px"
        fontFamily="Nunito Sans"
        fontStyle="normal"
        fontWeight="20"
        fontSize="20px"
      >
        {name}
      </Text>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
      >
        <Text as="a" href={linkLinkedin} mr="10px" target="_blank">
          <Image src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
        </Text>
        <Text as="a" href={linkGit}>
          <Image src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
        </Text>
      </Box>
    </Box>
  );
}
