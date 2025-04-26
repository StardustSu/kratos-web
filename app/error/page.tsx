'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IconError404, IconX } from '@tabler/icons-react';
import { Loader, Stack, Text, Title } from '@mantine/core';

function ErrorDisplay() {
  const params = useSearchParams();
  const [code, setCode] = useState(params.get('code') || 'ERR_UNKNOWN');

  useEffect(() => {
    setCode(params.get('code') || 'ERR_UNKNOWN');
  }, [params]);

  return (
    <Stack mt={32} align="center" ta="center">
      <IconX stroke={2} size={64} color="red" />
      {code == 'ERR_UNKNOWN' && (
        <>
          <Title>Произошла неизвестная ошибка</Title>
          <Text>
            Такое иногда случается... Но вы всегда можете <Link href="/">начать сначала</Link>.
          </Text>
        </>
      )}
      {code == 'ERR_NO_PRODUCT' && (
        <>
          <Title>Что-то пошло не так</Title>
          <Text maw="60%">
            Видимо, товар был изменен, пока вы набирались смелости нажать оплатить. Ничего
            страшного, всегда можно <Link href="/store">начать сначала</Link>.
          </Text>
        </>
      )}
      {code == 'GENESIS_404' && (
        <>
          <Title>Запрашиваемый ресурс не найден</Title>
          <Text maw="60%">
            Просто и понятно. Без лишней хуйни. Пожалуйста думай головой что ты делаешь.
          </Text>
        </>
      )}
    </Stack>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<Loader type="dots" />}>
      <ErrorDisplay />
    </Suspense>
  );
}
