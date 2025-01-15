import Layout from '@widgets/layout';
import NoPlacesSection from '../no-places-section';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import classNames from 'classnames';
import FavoritesOffersList from '@features/favorites-offers-list';
import { useFavoritesOffers } from '@entities/offer';

const PAGE_TITLE = '6 cities: favorites';

function FavoritesPage(): JSX.Element {
  const { favoritesOffers: offers } = useFavoritesOffers();
  const isOffersExists = offers.length > 0;
  const contentClassName = classNames('page__main--favorites', {
    ['page__main--favorites-empty']: !isOffersExists
  });

  return (
    <Layout>
      <Layout.Header />
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
