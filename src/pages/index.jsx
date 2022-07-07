import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/produtos?page=1");
  }, []);

  return (
    <></>
  );
}