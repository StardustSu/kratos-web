'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flex, Group, Stack, Text } from '@mantine/core';
import classes from './Footer.module.css';

function FooterContent() {
  const pathname = usePathname();
  const [genesis, setGenesis] = useState(false);

  useEffect(() => {
    setGenesis(pathname.startsWith('/genesis/'));
  }, [pathname]);

  return (
    <>
      {genesis ? (
        <Text ta="center" c="gray" miw="100%">
          Made by Nico {'<3'}
        </Text>
      ) : (
        <>
          <Stack gap={0} ta="center">
            {/* <Text size="xs" c="#b0b0b0">
          Интернет-ресурс kratosmc.ru
        </Text> */}
            <Text size="xs" c="#b0b0b0">
              Copyright © 2025. All rights reserved
            </Text>
            <Text size="xs" c="#b0b0b0">
              Сервера KratosMC не относятся к Mojang Studios.
            </Text>
            <Text size="xs" c="#b0b0b0">
              КУРЬЯНОВ МАКСИМ ЕВГЕНЬЕВИЧ (ИНН 663105080652)
            </Text>
          </Stack>
          <Stack gap={0} ta="center">
            <Text size="xs" c="#b0b0b0">
              <Link href="https://kratos-2.gitbook.io/kratos/legal/public-offer" target="_blank">
                Договор оферты
              </Link>
            </Text>
            <Text size="xs" c="#b0b0b0">
              <Link href="https://kratos-2.gitbook.io/kratos/legal/privacy-policy" target="_blank">
                Политика конфиденциальности
              </Link>
            </Text>
            <Text size="xs" c="#b0b0b0">
              <Link href="https://kratos-2.gitbook.io/kratos/legal/secure-payments" target="_blank">
                Порядок проведения оплаты и безопасность операций
              </Link>
            </Text>
          </Stack>
          <Stack gap={0} ta="center">
            <Text size="xs" c="#b0b0b0">
              <Link href="#" target="_blank">
                Мы ВКонтакте
              </Link>
            </Text>
            <Text size="xs" c="#b0b0b0">
              <Link href="https://t.me/KratosMCru" target="_blank">
                Telegram канал
              </Link>
            </Text>
            <Text size="xs" c="#b0b0b0">
              <Link href="mailto:admin@lampamc.ru" target="_blank">
                admin@lampamc.ru
              </Link>
            </Text>
          </Stack>
        </>
      )}
    </>
  );
}

export default function Footer() {
  return (
    <>
      <Flex align="center" justify="center">
        <Group
          mt="md"
          mb={16}
          bg="#1b1b1b"
          w="70%"
          gap="xs"
          p="sm"
          className={classes.footer}
          visibleFrom="sm"
          // align="center"
          justify="space-between"
        >
          <FooterContent />
        </Group>
        <Stack
          mt="md"
          mb={16}
          bg="#1b1b1b"
          w="70%"
          gap="xs"
          p="sm"
          className={classes.footer}
          hiddenFrom="sm"
          // align="center"
          // justify="space-between"
        >
          <FooterContent />
        </Stack>
      </Flex>
    </>
  );
}
