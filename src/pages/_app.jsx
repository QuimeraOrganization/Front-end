import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";

import themeChakra from "../styles/themeChakra";
import NavBar from "../components/NavBar";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthProvider>
      {/* <ThemeProvider theme={theme}> */}
      {/* <CssBaseline /> */}
      <ChakraProvider theme={themeChakra}>  
      
        {/* renderização condicional para tela de login */}
        {router.asPath !== "/login" &&
          router.asPath !== "/userRegister" &&
          router.asPath !== "/providerRegister" ? (
          <NavBar />
        ) : (
          ""
        )}

        <Component {...pageProps} />
        <Footer />
        <ToastContainer />
      </ChakraProvider>
      {/* </ThemeProvider> */}
    </AuthProvider>
  );
}

export default MyApp;
