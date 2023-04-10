import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <body>
          <ThemeProvider theme={theme}>
            <Main />
            <NextScript />
          </ThemeProvider>
        </body>
      </Html>
    );
  }
}