import { Layout } from '@features/layout';
import { Header } from '@widgets/header';
import { Hero } from './ui/hero';

export const LabsPage = () => {
  return (
    <Layout header={<Header />}>
      <Hero />
    </Layout>
  );
};
