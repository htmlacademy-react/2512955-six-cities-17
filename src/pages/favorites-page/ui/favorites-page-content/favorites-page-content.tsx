import { useFavoritesOffersListData } from '@entities/offer';
import FavoritesOffersList from '@features/favorites-offers-list';
import Layout from '@widgets/layout';
import classNames from 'classnames';
import NoPlacesSection from '../no-places-section';

export function FavoritesPageContent(): JSX.Element {
  const offers = useFavoritesOffersListData();
  const isOffersExists = offers.length > 0;
  const contentClassName = classNames('page__main--favorites', {
    ['page__main--favorites-empty']: !isOffersExists
  });

  return (
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
  );
}
