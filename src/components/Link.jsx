import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Link({ children, href, ...rest }) {
  return (
    <NextLink href={href} passHref
      align="center"
      justify="center"
      textAlign="center"
    >
      <ChakraLink display="inline-flex" _hover={{
        textDecoration: 'none'
      }}
        align="center"
        justify="center"
        textAlign="center"
        {...rest}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
}