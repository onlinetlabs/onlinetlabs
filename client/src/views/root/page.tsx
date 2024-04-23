import { Layout } from '@features/layout';
import { Header } from '@widgets/header';
import { Navbar } from '@widgets/navbar';

export const RootPage = () => {
  return (
    <Layout header={<Header />} navbar={<Navbar />}>
      <h1>Root page</h1>
    </Layout>
  );
};
