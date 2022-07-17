import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
const singOut = () => {
  destroyCookie(undefined, "nextauth.token");
  Router.push("/produtos?page=1");
};

export { singOut };
