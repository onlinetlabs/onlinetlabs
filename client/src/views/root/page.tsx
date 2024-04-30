import { BaseLayout } from '@views/layouts';
import { Header } from '@widgets/header';

export const RootPage = () => {
  return (
    <BaseLayout header={<Header />}>
      <h1>Root page</h1>
    </BaseLayout>
  );
};
