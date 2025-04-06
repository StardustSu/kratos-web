'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  defaultGradient: {
    from: '#f66ef1',
    to: '#bf00b9',
    deg: 240
  },
  colors: {
    kratos: [
      "#ffe9ff",
      "#fed1fd",
      "#faa1f6",
      "#f66ef1",
      "#f243eb",
      "#f028e9",
      "#f018e8",
      "#d609ce",
      "#bf00b9",
      "#a700a1"
    ]
  },
  defaultRadius: 'md',
  primaryColor: 'kratos',
  fontFamily: 'Unbounded, Inter, sans-serif',
});
