import { Group, Stack, Text, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFound() {
    return <Stack align="center" mt='xl'>
        <Title>Вот досада!</Title>
        <Text>Такой страницы нет, ах...</Text>
        <Link href={'/'}><IconArrowBack /> Вернуться на главную</Link>
    </Stack>
}