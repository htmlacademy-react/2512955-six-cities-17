import Layout from '@widgets/layout';
import { DEFAULT_STYLES_CONTAINER, DEFAULT_STYLES_IMAGE } from '@pages/main-page/config/defaults';

export function NotFoundPage(): JSX.Element {
  return (
    <Layout>
      <Layout.Header />
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
