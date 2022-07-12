import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/produtos?page=1");
  }, []);

  return <></>;
}
