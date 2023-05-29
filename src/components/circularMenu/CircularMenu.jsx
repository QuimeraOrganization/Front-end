import { Circle, Center, IconButton, Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";



const CircularMenu = () => {
  const {foods, setFoods} = useContext(AuthContext);
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);


  const handleIconClick = (title, index) => {
    setSelectedIconIndex(index);
    setFoods(title)
  };

  const icons = [
    { label: "Ovos", src: "/eggs.png", alt: "Ovos", bgColor: "#F0D68C", onClick: () => handleIconClick("Ovos", 0)},
    { label: "Soja", src: "/soja.png", alt: "Soja", bgColor: "#CD853F", onClick:() => handleIconClick("Soja", 1) },
    { label: "Peixe", src: "/peixe.png", alt: "Peixes", bgColor: "#87CEEB", onClick:() => handleIconClick("Peixe", 2) },
    { label: "Frutos de casca rija", src: "/FrutosdecascaRija.png", alt: "Frutos de casca rija", bgColor: "#CD853F", onClick:() => handleIconClick("Frutos de casca rija", 3)},
    { label: "Home", src: "/home4.png", alt: "Home", bgColor: "#F0D68C", onClick:() => handleIconClick("Ovos", 0) },
    { label: "Glúten", src: "/gluten.png", alt: "Glúten", bgColor: "#DAA520", onClick:() => handleIconClick("Gluten", 5) },
    { label: "Leite", src: "/caixadeleite.png", alt: "Leite", bgColor: "#87CEEB", onClick:() => handleIconClick("Leite", 6) },
    { label: "Amendoim", src: "/amendoim.png", alt: "Amendoim", bgColor: "#CD853F", onClick:() => handleIconClick("Amendoim", 7) },
  ];

  const [angle, setAngle] = useState(0);
  const [radius, setRadius] = useState(100);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newRadius = windowWidth < 768 ? 50 : 100;
      setRadius(newRadius);
    };

    if (isBrowser) {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [isBrowser]);



  return (
    <Box position="relative" >
      <Circle position="absolute">
        <Center h="100%" w="100%" position="relative">
          {isBrowser &&
            icons.map((item, index) => {
              const rotation = angle + (360 / icons.length) * index;
              const radians = rotation * (Math.PI / 180);
              const x = radius * Math.cos(radians);
              const y = radius * Math.sin(radians);
              const isSelected = index === selectedIconIndex;
              return (
                <IconButton
                  key={index}
                  aria-label={item.label}
                  size={window.innerWidth < 768 ? "sm" : "lg"}
                  colorScheme="none"
                  position="absolute"
                  left={`calc(50% + ${x}px - 1.5rem)`}
                  top={`calc(50% + ${y}px - 1.5rem)`}
                  transition="transform 0.2s"
           
                  _hover={{ transform: "translateY(-5px)", bgColor:"green" }}
                  onClick={item.onClick}
                  bgColor={isSelected ? "green" : item.bgColor}
                >
                  <img
                    style={{
                      width: window.innerWidth < 768 ? "2rem" : "3rem",
                      backgroundColor: item.bgColor,
                      padding: "0.5rem",
                      borderRadius: "1rem",
                    }}
                    src={item.src}
                    alt={item.alt}
                  />
                </IconButton>
              );
            })}
        </Center>
      </Circle>
    </Box>
  );
};

export default CircularMenu;