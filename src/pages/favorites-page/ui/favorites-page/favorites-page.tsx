import Layout from '@widgets/layout';
import type { MainOfferInfo } from '@entities/offer';
import NoPlacesSection from '../no-places-section';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import classNames from 'classnames';
import FavoritesOffersList from '@features/favorites-offers-list';
import { UserInfo } from '@entities/user';

type FavoritesPageProps = {
  offers: MainOfferInfo[];
}

const PAGE_TITLE = '6 cities: favorites';

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  const isOffersExists = offers.length > 0;
  const contentClassName = classNames('page__main--favorites', {
    ['page__main--favorites-empty']: !isOffersExists
  });

  return (
    <Layout>
      <Layout.Header>
        <UserInfo favoritesCount={offers.length} />
      </Layout.Header>
      <Layout.Content className={contentClassName}>
        <div className='page__favorites-container container'>
          {isOffersExists &&
            <section className='favorites'>
              <h1 className='favorites__title'>Saved listing</h1>
              <FavoritesOffersList offers={offers} />
            </section>}
          {!isOffersExists && <NoPlacesSection />}
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  );
}

export const FavoritesPageWithBrowserTitle = componentWithBrowserTitle(FavoritesPage, PAGE_TITLE);
