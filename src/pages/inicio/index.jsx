import {
  Flex,
  Heading,
  Box,
  Divider,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  SimpleGrid
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useContext } from "react";
import InformationCard from "../../components/card/InformationCard";
import CircularMenu from "../../components/circularMenu/CircularMenu";
import EquipeDesenvolvimento from "../../components/EquipeDesenvolvimento";
import { AuthContext } from "../../context/AuthContext";
import TEXTS from "../../utils/texts";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);  
const Inicio = () => {

  const {foods} = useContext(AuthContext);
  const [showAnimation, setShowAnimation] = useState(false);


  const dataEggs = {
    title:"Ovos",
    description: TEXTS.descriptionEggs,
    descriptionTwo: TEXTS.descriptionEggsTwo 
  }

  const dataFish = {
    title: "Peixe",
    description: TEXTS.descriptionFish,
    descriptionTwo: TEXTS.descriptionFishTwo
  }
  
  const dataMilk = {
    title: "Leite",
    description: TEXTS.descriptionMilk,
    descriptionTwo: TEXTS.descriptionMilkTwo
  }
  const dataAmendoim = {
    title: "Amendoim",
    description: TEXTS.descriptionAmendoim,
    descriptionTwo: TEXTS.descriptionAmendoimTwo
  }
  const dataCascaRija = {
    title: "Frutos de casca rija",
    description: TEXTS.descriptionCascaRija,
    descriptionTwo: TEXTS.descriptionCascaRijaTwo
  }
  const dataSoja = {
    title: "Soja",
    description: TEXTS.descriptionSoja,
    
  }
  const dataGluten = {
    title: "Glúten",
    description: TEXTS.descriptionGluten,
    
  }
  
  const verification = foods === "Ovos" ? dataEggs : foods === "Peixe" ? dataFish : foods === "Leite" ? dataMilk : foods === "Amendoim" ? dataAmendoim : foods === "Frutos de casca rija" ? dataCascaRija : foods === "Soja" ? dataSoja : foods === "Gluten" ? dataGluten : ""
  
  useEffect(() => {
    setShowAnimation(true);
  }, [verification]);

  return (
    <Flex
    flexDirection="column"
    width="full"
    minHeight="calc(100vh - 60px - 183px)"
    justifyContent="center"
    alignItems="center"
  >
    <Flex
      mx={{ base: "4", md: "8", lg: "16" }}
      my={{ base: "8", md: "0" }}
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box
        w={{ base: "full", md: "full", lg: "full" }}
        ml={{ base: "1rem", md: "20rem" }}
        mr={{ md: "10px" }}
        mb={{ base: "6rem", md: "20rem" }} 
        mt={{ base: "6rem", md: "12rem" }} 
        textAlign={{ base: "center", md: "left" }}
      >
        <Center>
          <CircularMenu />
        </Center>
      </Box>

      <Stack
        px={{ base: "4", md: "8", lg: "16" }}
        ml={{ base: "0", md: "10rem" }}
        // mb={{ base: "10rem", md: "15rem" }}
      >
        <MotionBox
          key={verification.title} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >

        <InformationCard
          title={verification.title}
          description={verification.description}
          descriptionTwo={verification.descriptionTwo}
        />
        </MotionBox>
      </Stack>
    </Flex>
  </Flex>
  );
};

export default Inicio;
