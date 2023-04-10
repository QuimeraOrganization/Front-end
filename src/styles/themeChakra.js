import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";
const themeChakra = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: "#F9F9F9",
        fontFamily: `"Inter", sans-serif`,
        color: "#253C1F"
      },
    })
  },
});


export default themeChakra;