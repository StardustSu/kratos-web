'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Center, Loader, Title } from '@mantine/core';
import { useUser } from '@/components/UserProvider/UserContext';

export default function GenesisLayout({ children }: { children: any }) {
  const user = useUser();
  const router = useRouter();
  const [access, setAccess] = useState(false);

  useEffect(() => {
    let uuid = localStorage.getItem('genesis');
    if (!uuid) {
      const random =
        (crypto.randomUUID && crypto.randomUUID()) || '2f9b83f2-3616-428f-a7f1-30f386962de6';
      localStorage.setItem('genesis', random);
      uuid = localStorage.getItem('genesis');
    }
    fetch(`https://api.lampamc.ru/genesis/access/${uuid}`)
      .then((data) => setAccess(data.ok))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let uuid = localStorage.getItem('genesis');
    if (uuid == '2f9b83f2-3616-428f-a7f1-30f386962de6') setAccess(true);
  }, [access]);

  return (
    <>
      {access ? (
        children
      ) : (
        <Center>
          <Loader type="dots" />
        </Center>
      )}
    </>
  );
}
