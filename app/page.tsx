'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Center, Group, Loader, Stack, Text, Title } from '@mantine/core';
import FlexSpacer from '@/components/FlexSpacer/FlexSpacer';
import InfoBar from '@/components/InfoBar/InfoBar';

export default function HomePage() {
  const [news, setNews] = useState<
    {
      Title: string;
      Content: string;
      Link?: string;
    }[]
  >([]);

  useEffect(() => {
    fetch('https://content.lampamc.ru/items/Kratos_News?sort=-date_created&limit=5')
      .then((res) => res.json())
      .then((data) => setNews(data.data));
  });

  const content = (limit: number) => {
    return news.map((post, i) => {
      return (
        <Stack key={i}>
          <Title size="lg">{post.Title}</Title>
          <Text size="sm">
            {text_truncate(post.Content, limit)}{' '}
            <Link href={post.Link || '#'} target="_blank">
              {'>'} Читать полностью
            </Link>
          </Text>
        </Stack>
      );
    });
  };

  return (
    <>
      <Group px="xl" justify="center">
        {news.length == 0 ? (
          <Center>
            <Loader type="dots" />
          </Center>
        ) : (
          <>
            <Stack bg="#2f2f2f" maw="70%" p="md" gap="16px" visibleFrom="sm">
              {content(255)}
            </Stack>
            <Stack bg="#2f2f2f" maw="70%" p="md" gap="16px" hiddenFrom="sm">
              {content(100)}
            </Stack>
          </>
        )}
        <div className="mantine-visible-from-sm">
          <InfoBar />
        </div>
      </Group>
    </>
  );
}

function text_truncate(str: string, length?: number, ending?: string) {
  // If the length parameter is not provided, set it to 100 characters
  if (length == null) {
    length = 100;
  }
  // If the ending parameter is not provided, set it to '...'
  if (ending == null) {
    ending = '...';
  }
  // Check if the length of the input string exceeds the specified length
  if (str.length > length) {
    // If yes, truncate the string to length - ending.length characters and append the ending
    return str.substring(0, length - ending.length) + ending;
  } else {
    // If no, return the original string
    return str;
  }
}
