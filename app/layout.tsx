import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './app.module.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider, Stack } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import FlexSpacer from '@/components/FlexSpacer/FlexSpacer';
import Footer from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import UserProvider from '@/components/UserProvider/UserProvider';
import { theme } from '../theme';

export const metadata = {
  title: 'Кратос — Твой сервер с ванильным выживанием и мини-играми',
  description:
    'Кратос — русский Minecraft-сервер с ванильным выживанием, мини-играми (DeathSwap, BlockShuffle, FreezeTag, HotPotato) и событиями от стримеров. IP: play.kratosmc.ru',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="ru" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <meta
          name="keywords"
          content="Minecraft, KratosMC, кратос, ванильное выживание, русский Minecraft-сервер, мини-игры Minecraft, DeathSwap, BlockShuffle, FreezeTag, HotPotato, стримеры Minecraft, PvE, PvP, ивенты, выживание, кастомные режимы"
        />
        <meta name="author" content="KratosMC Team, Stardust, Nico" />
        <meta name="language" content="ru" />
        <meta name="geo.region" content="RU" />
        <meta name="geo.placename" content="Россия" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications position="bottom-center" color="kratos" limit={3} autoClose={5000} />
          <ModalsProvider>
            <UserProvider>
              <Stack mih="100dvh">
                <Header />
                {children}
                <FlexSpacer />
                <Footer />
              </Stack>
            </UserProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
