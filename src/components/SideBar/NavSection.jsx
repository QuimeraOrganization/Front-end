import { Box, Stack } from "@chakra-ui/react";
export default function NavFunction({ children }) {
  return (
    <Box>
      <Stack spacing="4">{children}</Stack>
    </Box>
  );
}
