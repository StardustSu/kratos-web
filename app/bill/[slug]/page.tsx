'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Loader, Stack, Text, Title } from '@mantine/core';

export default function CheckBill() {
  const params = useParams();
  const [status, setStatus] = useState(0);

  const id = params.slug;

  useEffect(() => {
    const int = setInterval(() => {
      fetch(`https://api.kratosmc.ru/billing/${id}/status`)
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          if (data.status != 0) clearInterval(int);
        })
        .catch(() => setStatus(-100));
    }, 1_500);

    return () => clearInterval(int);
  }, []);

  return (
    <Stack mt={32} align="center" ta="center">
      {status == -100 && (
        <>
          <Loader color="red" type="dots" />
          <Text>Произошла ошибка при получении статуса платежа. Повторяем...</Text>
        </>
      )}
      {status == -1 && (
        <>
          <IconX size={64} color="red" />
          <Title>Вот досада!</Title>
          <Text>Мы не нашли нужного платежа.</Text>
          <Link href="/store">Попробовать еще раз</Link>
        </>
      )}
      {status == 0 && (
        <>
          <Loader type="dots" />
          <Text>Проверяем статус платежа...</Text>
        </>
      )}
      {status == 1 && (
        <>
          <IconCheck size={64} color="green" />
          <Title>Спасибо за покупку!</Title>
          <Link href="/store">Вернуться в магазин</Link>
        </>
      )}
      {status == 2 && (
        <>
          <IconX size={64} color="red" />
          <Title>Произошла ошибка при проведении платежа!</Title>
          <Link href="/store">Попробовать еще раз</Link>
        </>
      )}
    </Stack>
  );
}
