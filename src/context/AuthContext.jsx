import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import axios from "../config/axios";
import parseJwt from "../utils/parseJWT";
import { singOut } from "../utils/singOut";
import Router from "next/router";
const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      const id = parseJwt(token).id;
      axios
        .get(`/users/${id}`)
        .then((res) => {
          const { id, email, permission } = res.data;
          setUser(id, email, permission);
        })
        .catch(() => {
          singOut();
        });
    }
  }, []);

  async function singIn({ email, password }) {
    try {
      const res = await axios.post("token", {
        email,
        password,
      });

      const { token } = res.data;

      setCookie(undefined, "nextauth.token", token, {
        //tempo de vida do cookie
        maxAge: 60 * 60 * 24 * 30, //30 dias
        //quais caminhos da aplicação vão ter acessos a esses cookies
        //no caso,esse vai ter usado de forma global
        path: "/",
      });

      setUser(parseJwt(token));

      //atulizando o header
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ singIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
