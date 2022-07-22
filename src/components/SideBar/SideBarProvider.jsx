import { Box, Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiProductHuntLine,
  RiDashboardLine,
} from "react-icons/ri";

import NavLink from "./NavLink";
import NavSection from "./NavSection";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getBrandById } from "../../services/brandService";
export default function SideBarProvider() {
  const { user } = useContext(AuthContext);
  const [brand, setBrand] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await getBrandById(user.brandId).then((data) => {
          setBrand(data.name);
        });
      } catch (error) {
        setError("deu erro");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection>
          <NavLink icon={RiProductHuntLine} entidade={brand} href={"#"} />
        </NavSection>
      </Stack>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  const token = cookies["nextauth.token"];
  //se não existir o token, ele redireciona para a pag index.
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}
