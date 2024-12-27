import Layout from '@widgets/layout';
import { DEFAULT_STYLES_CONTAINER, DEFAULT_STYLES_IMAGE } from '@pages/main-page/config/defaults';
import { UserInfo } from '@entities/user';

type NotFoundPageProps = {
  favoritesCount: number;
}

export function NotFoundPage({ favoritesCount }: NotFoundPageProps): JSX.Element {
  return (
    <Layout>
      <Layout.Header>
        <UserInfo favoritesCount={favoritesCount} />
      </Layout.Header>
      <Layout.Content>
        <div className='container' style={DEFAULT_STYLES_CONTAINER}>
          <img src='img/not-found.svg' style={DEFAULT_STYLES_IMAGE} />
          <h1>
            404 Page not found!
          </h1>
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  );
}
