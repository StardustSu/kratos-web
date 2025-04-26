'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IconArrowRight } from '@tabler/icons-react';
import { Button, Center, Flex, Group, Loader, Spoiler, Stack, Text, Title } from '@mantine/core';
import FlexSpacer from '@/components/FlexSpacer/FlexSpacer';
import InfoBar from '@/components/InfoBar/InfoBar';
import classes from './games.module.css';

interface Mode {
  id: number;
  title: string;
  description: string;
  picture: string;
}

export default function HomePage() {
  const router = useRouter();
  const [modes, setModes] = useState<Mode[]>([]);
  const [sel, setSel] = useState<Mode>();
  const [expanded, setExpanded] = useState(0);

  useEffect(() => {
    fetch('https://content.lampamc.ru/items/Kratos_Modes')
      .then((res) => res.json())
      .then((data) => {
        setModes(data.data);
      });
  }, []);

  useEffect(() => {
    setSel(modes[1]);
  }, [modes]);

  return (
    <>
      {modes.length == 0 ? (
        <Center>
          <Loader type="dots" />
        </Center>
      ) : (
        <>
          <Stack justify="center" align="center" visibleFrom="lg">
            <Group
              mx="10%"
              bg="#2e2e2e"
              style={{ borderRadius: '16px', border: '1px solid #525252' }}
            >
              <Image
                src={"https://storage.kratosmc.ru/pics/PrimaryGame.png"}
                height={240}
                width={600}
                alt="product"
                style={{ borderRadius: '16px 0px 0px 16px', width: '40%' }}
              />
              <FlexSpacer />
              <Stack maw="55%" p="md" ta="end" align="flex-end">
                <Title>{modes[0].title}</Title>
                <Text>{modes[0].description}</Text>
                <Button maw="fit-content" onClick={() => router.push('/store#free')}>
                  Перейти в магазин
                  <IconArrowRight />
                </Button>
              </Stack>
            </Group>
            <Group w="90%">
              <Group justify="center" gap="32px" maw="70%">
                <Stack>
                  {modes.map((mode, i) => {
                    return (
                      <Flex
                        key={i}
                        px="32px"
                        py="16px"
                        bg={`url(${mode.picture})`}
                        bgp="center"
                        bgsz="cover"
                        style={{
                          borderRadius: '8px',
                          transform: `${(sel == mode && 'translateX(12px)') || ''}`,
                        }}
                        ff="Unbounded-Medium, Inter, sans-serif"
                        className={classes.mode}
                        onClick={() => {
                          setSel(mode);
                        }}
                        w={300}
                        h={60}
                      >
                        {/* {mode.title} */}
                      </Flex>
                    );
                  })}
                </Stack>
                <Stack w="40%">
                  <Title>{sel?.title}</Title>
                  <Text>{sel?.description}</Text>
                </Stack>
              </Group>
              <InfoBar />
            </Group>
          </Stack>
          <Stack justify="center" align="center" hiddenFrom="lg">
            {modes.map((mode, i) => {
              return (
                <Stack
                  key={i}
                  w="80%"
                  px="32px"
                  py="16px"
                  // bg={`url(${mode.picture})`}
                  bgp="center"
                  bgsz="cover"
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #1e1e1e',
                    backgroundColor: '#343434',
                  }}
                  ff="Unbounded-Medium, Inter, sans-serif"
                  onClick={() => {
                    setSel(mode);
                  }}
                >
                  <Image
                    width={400}
                    height={56}
                    src={mode.picture}
                    alt={mode.title}
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      borderRadius: '12px',
                    }}
                  />
                  {/* {mode.title} */}
                  <Spoiler
                    maxHeight={38}
                    hideLabel={'Скрыть'}
                    showLabel={'Подробнее...'}
                    expanded={i == expanded}
                    onExpandedChange={(exp) => (exp ? setExpanded(i) : setExpanded(-1))}
                    fs={'sm'}
                    ff="Unbounded, Inter, sans-serif"
                  >
                    <Text size="sm" ff="Unbounded, Inter, sans-serif">
                      {mode.description}
                    </Text>
                  </Spoiler>
                </Stack>
              );
            })}
          </Stack>
        </>
      )}
    </>
  );
}
