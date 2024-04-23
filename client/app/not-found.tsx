import { NotFoundPage } from '@views/not-found';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Страница не найдена | onlinetlabs',
};

export default function Custom404() {
  return <NotFoundPage />;
}
