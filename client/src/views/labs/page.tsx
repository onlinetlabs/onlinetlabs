import { Layout } from '@features/layout';
import { Header } from '@widgets/header';
import { Navbar } from '@widgets/navbar';

export const LabsPage = () => {
  return (
    <Layout header={<Header />} navbar={<Navbar />}>
      <h1>Labs page</h1>
    </Layout>
  );
};
