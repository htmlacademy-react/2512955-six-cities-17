import Layout from '@widgets/layout';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import { FavoritesPageContent } from '../favorites-page-content';

const PAGE_TITLE = '6 cities: favorites';

function FavoritesPage(): JSX.Element {
  return (
    <Layout>
      <Layout.Header />
      <FavoritesPageContent />
      <Layout.Footer />
    </Layout>
  );
}

export const FavoritesPageWithBrowserTitle = componentWithBrowserTitle(FavoritesPage, PAGE_TITLE);
