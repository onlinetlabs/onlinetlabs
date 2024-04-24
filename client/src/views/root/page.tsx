import { Layout } from '@features/layout';
import { Header } from '@widgets/header';

export const RootPage = () => {
  return (
    <Layout header={<Header />}>
      <h1>Root page</h1>
    </Layout>
  );
};
