import { Box, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import {
  RiContactsLine,
  RiProductHuntLine,
  RiDashboardLine,
} from "react-icons/ri";
import { BiCommentDetail, BiCategory } from "react-icons/bi";
import { BsJournalBookmark } from "react-icons/bs";
import { MdOutlineFoodBank } from "react-icons/md";

import NavLink from "./NavLink";
import NavSection from "./NavSection";

export default function SideBar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection>
          <NavLink icon={RiContactsLine} entidade={"Usuários"} href="/users" />
          <NavLink
            icon={RiProductHuntLine}
            entidade={"Produtos"}
            href="/products"
          />
          <NavLink
            icon={MdOutlineFoodBank}
            entidade={"Ingredientes"}
            href="/ingredients"
          />
          <NavLink
            icon={BsJournalBookmark}
            entidade={"Marcas"}
            href="/brands"
          />
          <NavLink
            icon={BiCategory}
            entidade={"Categorias"}
            href="/categories"
          />
          <NavLink
            icon={BiCommentDetail}
            entidade={"Feedbacks"}
            href="/feedbacks"
          />
        </NavSection>
      </Stack>
    </Box>
  );
}
