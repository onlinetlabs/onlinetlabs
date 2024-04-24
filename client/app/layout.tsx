import { EffectorNext } from '@effector/next';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';

import '@mantine/core/styles.css';
import '@app/global.css';

export const metadata: Metadata = {
  title: 'Обучающая платформа | onlinetlabs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <EffectorNext>
          <MantineProvider>{children}</MantineProvider>
        </EffectorNext>
      </body>
    </html>
  );
}
