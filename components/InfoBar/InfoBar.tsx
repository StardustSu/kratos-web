'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IconAddressBook, IconCopy, IconCube, IconLink } from '@tabler/icons-react';
import { Button, Card, Group, Popover, Stack, Text } from '@mantine/core';

export default function InfoBar() {
  const [copy, setCopy] = useState(false);
  const [online, setOnline] = useState(0);

  const copyIp = () => {
    if (navigator.clipboard) navigator.clipboard.writeText('play.kratosmc.ru');
    setCopy(true);
    setTimeout(() => setCopy(false), 900);
  };

  const refresh = () => {
    fetch('https://api.kratosmc.ru/info/online')
      .then((data) => data.json())
      .then((data) => setOnline(data.online || 0))
      .catch(() => {});
  };

  useEffect(() => {
    refresh();
    const to = setInterval(refresh, 5_000);
    return () => clearInterval(to);
  }, []);

  return (
    <Card style={{ gap: '12px' }}>
      <Stack gap={0}>
        <Text size="sm" c="gray">
          Текущий онлайн
        </Text>
        <Group gap={8}>
          <IconCube />
          <Text size="md" c="kratos" fw={900} ff="Unbounded-Medium, sans-serif">
            {online} / 250
          </Text>
        </Group>
      </Stack>
      <Stack gap={0}>
        <Text size="sm" c="gray">
          IP адрес
        </Text>
        <Group gap={8}>
          <IconAddressBook />
          <Popover position="top" shadow="md" opened={copy}>
            <Popover.Target>
              <Button variant="transparent" p={0} onClick={copyIp}>
                <Text size="md" c="kratos" fw={900} ff="Unbounded-Medium, sans-serif">
                  play.kratosmc.ru
                </Text>
                <IconCopy size={12} color="white" style={{ marginLeft: '4px' }} />
              </Button>
            </Popover.Target>

            <Popover.Dropdown>
              <Text size="xs">Скопировано!</Text>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Stack>
      <Stack gap={0}>
        <Text size="sm" c="gray">
          ВКонтакте
        </Text>
        <Group gap={8}>
          <IconLink />
          <Link href="#">
            <Text size="md" c="blue" ff="Unbounded-Medium, sans-serif" td="none">
              Перейти
            </Text>
          </Link>
        </Group>
      </Stack>
      <Stack gap={0}>
        <Text size="sm" c="gray">
          Телеграм
        </Text>
        <Group gap={8}>
          <IconLink />
          <Link href="https://t.me/kratosmcru" target="_blank">
            <Text size="md" c="cyan" ff="Unbounded-Medium, sans-serif" td="none">
              @KratosMCru
            </Text>
          </Link>
        </Group>
      </Stack>
    </Card>
  );
}
