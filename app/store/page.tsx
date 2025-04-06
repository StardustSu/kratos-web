'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconAt, IconShoppingCart, IconTag } from '@tabler/icons-react';
import {
  Badge,
  Button,
  Card,
  Center,
  Group,
  Image,
  Loader,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '@/components/UserProvider/UserContext';
import WhitelistButton from '@/components/WhitelistButton';
import classes from './store.module.css';

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  picture: string;
  sale: boolean;
  old_price?: number;
}

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export default function HomePage() {
  const router = useRouter();
  const user = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [opened, setOpened] = useState(-1);
  const [emailError, { open, close }] = useDisclosure(false);
  const [nameError, { open: nameErr, close: stopName }] = useDisclosure(false);
  const [loading, { open: load }] = useDisclosure(false);
  const [free, { open: setFree }] = useDisclosure(false);

  useEffect(() => {
    fetch('https://content.lampamc.ru/items/Kratos_Products')
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
    if (window.location.hash == '#free') {
      setFree();
      window.location.hash = '';
    }
  }, []);

  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  useEffect(() => {
    setEmail(user.email);
  }, [user.email]);

  const validateAndBuy = () => {
    if (name.length == 0 || name.match(/\s/gimu)) return nameErr();
    if (!validateEmail(email)) return open();
    load();
    user.setName(name);
    // router.push('http://dev.lampamc.ru:5173/error?code=ERR_NO_PRODUCT');
    router.push(
      `https://api.kratosmc.ru/billing/pay?product=${products[opened].id}&email=${email}&nickname=${name}`
    );
  };

  return (
    <>
      <Modal opened={opened != -1} onClose={() => setOpened(-1)} title="Покупка" centered>
        <Group gap="md">
          <TextInput
            autoCapitalize="off"
            size="md"
            w="100%"
            withAsterisk
            value={name}
            onChange={(e) => {
              stopName();
              setName(e.currentTarget.value);
            }}
            label="Ник"
            placeholder="Steve"
            leftSection={<IconTag size={16} />}
            error={nameError}
          />
          <TextInput
            type="email"
            size="md"
            w="100%"
            withAsterisk
            value={email}
            onChange={(e) => {
              close();
              user.setEmail(e.currentTarget.value);
            }}
            label="Email"
            placeholder="player@kratosmc.ru"
            leftSection={<IconAt size={16} />}
            error={emailError && 'Введите корректную почту'}
          />
          {opened != -1 && (
            <TextInput
              size="md"
              w="100%"
              value={products[opened].name}
              label="Товар"
              disabled
              leftSection={<IconShoppingCart size={16} />}
            />
          )}
          {opened != -1 && (
            <Button loading={loading} fullWidth onClick={validateAndBuy}>
              Купить за ₽ {products[opened].price / 100}
            </Button>
          )}
        </Group>
      </Modal>
      {products.length == 0 ? (
        <Center>
          <Loader type="dots" />
        </Center>
      ) : (
        <Group align="center" justify="center" wrap="wrap" px="5%">
          <div className={classes.container}>
            <div className={free ? classes.animate : ''}>
              <Card withBorder>
                <Card.Section>
                  <Image src={products[0].picture} height={160} width={260} alt="image" />
                </Card.Section>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Бесплатная проходка</Text>
                </Group>
                <WhitelistButton />
              </Card>
            </div>
          </div>
          {products.map((product, i) => {
            return (
              <Card key={i} withBorder>
                <Card.Section>
                  <Image src={product.picture} height={160} width={260} alt="image" />
                </Card.Section>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{product.name}</Text>
                  {product.sale && <Badge color="pink">Sale</Badge>}
                </Group>
                <Button
                  variant="gradient"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => setOpened(i)}
                >
                  {product.old_price && (
                    <Badge size="xs" td="line-through" color="red" radius="sm" mr={4}>
                      ₽ {product.old_price / 100}
                    </Badge>
                  )}{' '}
                  ₽ {product.price / 100}
                  <IconShoppingCart className={classes.icon} stroke={1.5} />
                </Button>
              </Card>
            );
          })}
        </Group>
      )}
    </>
  );
}
