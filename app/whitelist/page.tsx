import Link from 'next/link';
import { Text, Title } from '@mantine/core';

export default function HomePage() {
  return (
    <>
      <Title ta="center">Упс, ошибочка вышла...</Title>
      <Text ta="center">Подать заявку на вайтлист не получится.</Text>
      <Text ta="center">
        Предлагаю написать <Link href="https://t.me/Toxa_wr">модератору.</Link>
      </Text>
    </>
  );
}
