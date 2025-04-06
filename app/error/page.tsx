'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IconError404, IconX } from '@tabler/icons-react';
import { Stack, Text, Title } from '@mantine/core';

export default function ErrorPage() {
  const params = useSearchParams();
  const [code, setCode] = useState(params.get('code') || 'ERR_UNKNOWN');

  useEffect(() => {
    setCode(params.get('code') || 'ERR_UNKNOWN');
  }, [params]);

  return (
    <Stack mt={32} align="center" ta="center">
      {code == 'ERR_UNKNOWN' && (
        <>
          <IconX stroke={2} size={64} color="red" />
          <Title>Произошла неизвестная ошибка</Title>
          <Text>
            Такое иногда случается... Но вы всегда можете <Link href="/">начать сначала</Link>.
          </Text>
        </>
      )}
      {code == 'ERR_NO_PRODUCT' && (
        <>
          <IconX stroke={2} size={64} color="red" />
          <Title>Что-то пошло не так</Title>
          <Text maw="60%">
            Видимо, товар был изменен, пока вы набирались смелости нажать оплатить. Ничего
            страшного, всегда можно <Link href="/store">начать сначала</Link>.
          </Text>
        </>
      )}
    </Stack>
  );
}
