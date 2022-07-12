import { Text, Link as ChakraLink, Icon } from "@chakra-ui/react";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
export default function NavLink({ icon, entidade, href, ...rest }) {
  return (
    <Link href={href} passHref>
      <ChakraLink display="flex" align="center" gap="5" {...rest}>
        <Icon as={icon} fontSize="28px" marginTop="6px" />
        <ActiveLink href={href} passHref>
          <Text
            width="264px"
            height="44px"
            fontWeight="700"
            bg="#ffffff"
            color="#6FBE5E"
            fontSize="18px"
            fontFamily="Inter"
            lineHeight="22px"
            border="0.5px solid #6FBE5E"
            textAlign="center"
            padding="10px"
            borderRadius="10px"
          >
            {entidade}
          </Text>
        </ActiveLink>
      </ChakraLink>
    </Link>
  );
}
