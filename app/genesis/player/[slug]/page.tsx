'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Center, Loader, Stack, Text, Title } from '@mantine/core';

export default function FreeWhitelist() {
  const params = useParams();
  const router = useRouter();
  const name = params.slug;

  const [player, setPlayer] = useState<{
    id: string;
    nickname: string;
    whitelisted_until: number;
    balance: number;
    created_at: number;
    updated_at: number;
  } | null>(null);

  const refresh = () => {
    fetch(`https://api.kratosmc.ru/genesis/player/${name}`)
      .then((data) => (data.status == 404 && router.push('/error?code=GENESIS_404')) || data)
      .then((data) => data.json())
      .then((data) => {
        setPlayer(data);
      })
      .catch(() => {
        router.push('/error');
      });
  };

  useEffect(refresh, []);

  function addWhitelist(days: number) {
    return () => {
      fetch(`https://api.kratosmc.ru/genesis/player/${name}/whitelist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          add: days,
        }),
      })
        .then(refresh)
        .catch(() => {
          router.push('/error');
        });
    };
  }

  return (
    <Center>
      {(!player && <Loader type="dots" />) || (
        <Stack maw="60%" ta="center" align="center">
          <Title>{player?.nickname}</Title>
        </Stack>
      )}
    </Center>
  );
}
