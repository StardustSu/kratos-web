'use client';

import { useRouter } from 'next/navigation';
import { IconForms } from '@tabler/icons-react';
import { Button } from '@mantine/core';

export default function WhitelistButton() {
  const router = useRouter();
  return (
    <Button
      variant="gradient"
      fullWidth
      mt="md"
      radius="md"
      onClick={() => router.push('/whitelist')}
    >
      Подать заявку
      <IconForms stroke={1.5} style={{ marginLeft: '4px' }} />
    </Button>
  );
}
