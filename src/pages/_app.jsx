import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";

import theme from "../styles/theme";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        {/* Depois modificar para não aparecer a barra de navegação no login e no cadastro */}
        <NavBar />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
