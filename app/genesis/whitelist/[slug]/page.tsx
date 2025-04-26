'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Center, Loader, Stack, Text, Title } from '@mantine/core';

export default function FreeWhitelist() {
  const params = useParams();
  const router = useRouter();
  const id = params.slug;

  const [order, setOrder] = useState<{
    id: string;
    nickname: string;
    description: string;
    contact: string;
    approved: boolean;
  } | null>(null);

  const refresh = () => {
    fetch(`https://api.kratosmc.ru/genesis/whitelist/${id}`)
      .then((data) => (data.status == 404 && router.push('/error?code=GENESIS_404')) || data)
      .then((data) => data.json())
      .then((data) => {
        setOrder(data);
      })
      .catch(() => {
        router.push('/error');
      });
  };

  useEffect(refresh, []);

  function approve(days: number) {
    return () => {
      fetch(`https://api.kratosmc.ru/genesis/whitelist/${id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          days: days,
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
      {(!order && <Loader type="dots" />) || (
        <Stack maw="60%" ta="center" align="center">
          <Title>
            {order?.nickname} <span>{order?.approved ? '✅' : '⏳'}</span>
          </Title>
          <Text size="lg">{order?.description}</Text>
          <Text>Contact: {order?.contact || 'НЕ УКАЗАНО НАХУЙ'}</Text>
          {!order?.approved && (
            <Stack>
              <Button color="green" onClick={approve(30)}>
                Approve for 30d
              </Button>
              <Button color="green" onClick={approve(180)}>
                Approve for 180d
              </Button>
            </Stack>
          )}
        </Stack>
      )}
    </Center>
  );
}
