import Link from "next/link";
import { useRouter } from "next/router";
import { cloneElement } from "react";

// shouldMatchExactHref = deve corresponder exatamente a href
export default function ActiveLink({
  children,
  //para definir se um link está ativo ou não
  //, não é preciso é bater exatamente com a rota ativa atualmente que está em cima(Ativa)
  //na verdade ela precisa começar com o endereço que está lá em cima
  //caso algum link precise bater exatamente com a url ativa,só precisar passar
  //propriedade como true.
  shouldMatchExactHref = false,
  ...rest
}) {
  // rota ativa atualmente = asPath
  const { asPath } = useRouter();

  let isActive = false;
  //caso for preciso dá um match na rota
  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }
  //caso não seja preciso dá um match na rota, que é o caso do /users/create
  //verifico se a rota começa como rest.href, se começar,isActive= true
  if (
    (!shouldMatchExactHref && asPath.startsWith(String(rest.href))) ||
    asPath.startsWith(String(rest.as))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        bg: isActive ? "#6FBE5E" : "#FFFFFF",
        color: isActive ? "#FFFFFF" : "#6FBE5E",
      })}
    </Link>
  );
}
