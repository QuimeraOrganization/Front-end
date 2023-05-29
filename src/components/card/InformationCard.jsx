import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);  

const InformationCard = ({ title, description, descriptionTwo }) => {



  return (
    <MotionBox
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      width={["100%", "30vw", "35vw", "40vw"]}
      minHeight={["100%", "30vh", "35vh", "40vh"]}
    >
      <VStack align="flex-start" spacing={4}>
        <Heading fontSize={["xl", "2xl", "3xl"]} mb={2}>
          {title}
        </Heading>
        <Text textAlign={"justify"}  fontSize={["md", "lg", "xl"]}>{description}</Text>
        <Text textAlign={"justify"} fontSize={["md", "lg", "xl"]}>{descriptionTwo}</Text>
      </VStack>
    </MotionBox>
  );
};

export default InformationCard;