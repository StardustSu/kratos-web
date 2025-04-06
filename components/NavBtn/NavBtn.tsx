'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Flex, NavLink } from '@mantine/core';
import classes from './NavBtn.module.css';

export default function NavBtn({ to, children }: { to: string; children: any }) {
  const pathname = usePathname();
  const current = pathname == to;
  return (
    <>
      <Flex visibleFrom="sm">
        <Link href={to} className={current ? classes.current : classes.link}>
          {(!current && (
            <Button variant="outline" color="white">
              {children}
            </Button>
          )) || (
            <Button variant="light" color="kratos">
              {children}
            </Button>
          )}
        </Link>
      </Flex>
      <Flex hiddenFrom="sm">
        <Link href={to}>
          {(current && (
            <Button variant="subtle" className={classes.mobile}>
              {children}
            </Button>
          )) || (
            <Button variant="subtle" className={classes.mobile} color="white">
              {children}
            </Button>
          )}
        </Link>
      </Flex>
    </>
  );
}
