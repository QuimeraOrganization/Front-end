import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <Flex
      direction="row"
      bg="#6FBE5E"
      justify="space-around"
      align="stretch"
      color="#FFFFFF"
      as="footer"
      py="4"
    >
      <Stack justify="space-between" width="200">
        <Stack align="center">
          <Image src="Logo-white.svg" alt="" mb="4" />
          <Text color="muted" fontSize="sm" fontWeight="bold">
            © Copyright 2022
          </Text>
          <Text color="muted" fontSize="sm" fontWeight="bold">
            All Rights Reserved.
          </Text>
        </Stack>
      </Stack>

      <Stack width="200">
        <Text fontSize="lg" fontWeight="bold">
          Sua conta
        </Text>
        <Stack spacing="3" shouldWrapChildren>
          <Button variant="link" color="white" size="sm" fontWeight="light">
            Cadastre-se
          </Button>
          <Button variant="link" color="white" size="sm" fontWeight="light">
            Entrar
          </Button>
        </Stack>
      </Stack>

      <Stack width="200">
        <Text fontSize="lg" fontWeight="bold">
          Sobre
        </Text>
        <Stack spacing="3" shouldWrapChildren>
          <Button variant="link" color="white" size="sm" fontWeight="light">
            Sobre
          </Button>
        </Stack>
      </Stack>

      <Stack direction="column" width="200">
        <Text fontSize="lg" fontWeight="bold">
          Social media
        </Text>
        <ButtonGroup variant="link">
          <IconButton
            as="a"
            href="#"
            aria-label="Facebook"
            color="white"
            icon={<FaFacebook fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            color="white"
            aria-label="Instagram"
            icon={<FaInstagram fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            color="white"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
    </Flex>
  );
}
