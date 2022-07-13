import { Box, Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiProductHuntLine,
  RiDashboardLine,
} from "react-icons/ri";
import NavLink from "./NavLink";
import NavSection from "./NavSection";
export default function SideBar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection>
          <NavLink icon={RiContactsLine} entidade={"Usuário"} href="/users" />
          <NavLink
            icon={RiProductHuntLine}
            entidade={"Produtos"}
            href="/produtos?page=1"
          />
          <NavLink
            icon={RiProductHuntLine}
            entidade={"Ingredientes"}
            href="/ingredients"
          />
          <NavLink
            icon={RiProductHuntLine}
            entidade={"Marcas"}
            href="/brands"
          />
          <NavLink
            icon={RiDashboardLine}
            entidade={"Categorias"}
            href="/categories"
          />
          <NavLink
            icon={RiDashboardLine}
            entidade={"Feedbacks"}
            href="/feedbacks"
          />
        </NavSection>
      </Stack>
    </Box>
  );
}
