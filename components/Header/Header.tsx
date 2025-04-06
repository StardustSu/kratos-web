'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  IconBrandWikipedia,
  IconDashboard,
  IconDeviceGamepad,
  IconGraph,
  IconLogin,
  IconMailQuestion,
  IconShoppingBag,
} from '@tabler/icons-react';
import {
  Burger,
  Button,
  Drawer,
  Group,
  Modal,
  NavLink,
  Space,
  Stack,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import FlexSpacer from '../FlexSpacer/FlexSpacer';
import NavBtn from '../NavBtn/NavBtn';
import { useUser } from '../UserProvider/UserContext';
import classes from './Header.module.css';

export function Header() {
  const user = useUser();
  const [nickname, setNickname] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [burger, { toggle, close: closeBurger }] = useDisclosure();

  const applyName = () => {
    setModalLoading(true);
    user.setName(nickname);
    setNickname('');
    close();
    setModalLoading(false);
  };

  return (
    <>
      <Drawer
        position="right"
        hiddenFrom="sm"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        size="75%"
        opened={burger}
        onClose={closeBurger}
      >
        <Stack gap="xs" align="end">
          <Group>
            {user.name || 'Вы'}
            <Image
              src={`https://mc-heads.net/body/${user.name || 'Steve'}`}
              alt="skin"
              height={48}
              width={21}
              objectFit="cover"
            />
            <Button variant="subtle" onClick={open}>
              <IconLogin />
            </Button>
          </Group>
          <NavBtn to="/">
            Главная <IconDashboard className={classes['icon-left']} />
          </NavBtn>
          <NavBtn to="/games">
            Режимы <IconDeviceGamepad className={classes['icon-left']} />
          </NavBtn>
          {/* <NavBtn to="/leaderboards">
            Таблица лидеров <IconGraph className={classes['icon-left']} />
          </NavBtn> */}
          <NavBtn to="/wiki">
            Wiki <IconMailQuestion className={classes['icon-left']} />
          </NavBtn>
          <NavBtn to="/store">
            Магазин <IconShoppingBag className={classes['icon-left']} />
          </NavBtn>
        </Stack>
      </Drawer>
      <Modal opened={opened} onClose={close} title="Введи ник">
        <TextInput
          placeholder="Steve"
          value={nickname}
          onChange={(e) => {
            setNickname(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key == 'Enter') applyName();
          }}
        />
        <Button fullWidth onClick={applyName} mt="md" loading={modalLoading} variant="outline">
          <IconLogin />
          Войти
        </Button>
      </Modal>
      <Stack mt={16} gap="xs" align="center" visibleFrom="sm" mb="md">
        <Group w="70%" bg="#1b1b1b" p="sm" className={classes.header}>
          <Link href="/" className={classes.logo}>
            <Image src="/logo.svg" width={200} height={48} alt="logo" />
          </Link>
          <FlexSpacer />
          {user.name || 'Вы'}
          <Image
            src={`https://mc-heads.net/body/${user.name || 'Steve'}`}
            alt="skin"
            height={48}
            width={21}
            objectFit="cover"
          />
          <Button variant="subtle" onClick={open}>
            <IconLogin />
          </Button>
        </Group>
        <Group justify="center" bg="#1b1b1b" p="sm" px="xl" className={classes.header}>
          <NavBtn to="/">
            <IconDashboard className={classes['icon-right']} /> Главная
          </NavBtn>
          <NavBtn to="/games">
            <IconDeviceGamepad className={classes['icon-right']} /> Режимы
          </NavBtn>
          {/* <NavBtn to="/leaderboards">
            <IconGraph className={classes['icon-right']} /> Таблица лидеров
          </NavBtn> */}
          <NavBtn to="/wiki">
            <IconMailQuestion className={classes['icon-right']} /> Wiki
          </NavBtn>
          <NavBtn to="/store">
            <IconShoppingBag className={classes['icon-right']} /> Магазин
          </NavBtn>
        </Group>
      </Stack>
      <Stack mt={16} gap="xs" align="center" hiddenFrom="sm" mb="md">
        <Group w="70%" bg="#1b1b1b" p="sm" className={classes.header}>
          <Link href="/" className={classes.logo}>
            <Image src="/logo.svg" width={170} height={48} alt="logo" />
          </Link>
          <FlexSpacer />
          <Burger opened={burger} onClick={toggle} />
        </Group>
      </Stack>
    </>
  );
}
