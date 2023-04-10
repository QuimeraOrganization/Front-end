import { extendTheme } from "@chakra-ui/react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/inter";

// const theme = extendTheme({
//   styles: {
//     global: (props) => ({
//       body: {
//         bg: "#F9F9F9",
//         fontFamily: `"Inter", sans-serif`,
//         color: "#253C1F"
//       },
//     })
//   },
// });

export const theme = createTheme({
  palette: {
    primary: {
      main: '#253C1F',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default:  "#F9F9F9",
    },
    
  },
  
  
});

