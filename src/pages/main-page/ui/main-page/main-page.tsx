import Layout from '@widgets/layout';
import type { MainOfferInfo } from '@entities/offer';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import MainOffersList from '@features/main-offers-list';
import classNames from 'classnames';
import NoPlacesSection from '../no-places-section';
import { UserInfo } from '@entities/user';

type MainPageProps = {
  offers: MainOfferInfo[];
}

const PAGE_TITLE = '6 cities';

function MainPage({ offers }: MainPageProps): JSX.Element {
  const isOffersExists = offers.length > 0;
  const contentClassName = classNames(
    'page__main--index',
    {
      'page__main--index-empty': !isOffersExists
    }
  );

  const containerClassName = classNames(
    'cities__places-container',
    {
      'cities__places-container--empty': !isOffersExists
    },
    'container'
  );
  return (
    <Layout className='page--gray page--main'>
      <Layout.Header>
        <UserInfo favoritesCount={offers.filter((current) => current.isFavorite).length} />
      </Layout.Header>
      <Layout.Content className={contentClassName}>
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <section className='locations container'>
            <ul className='locations__list tabs__list'>
              <li className='locations__item'>
                <a className='locations__item-link tabs__item' href='#'>
                  <span>Paris</span>
                </a>
              </li>
              <li className='locations__item'>
                <a className='locations__item-link tabs__item' href='#'>
                  <span>Cologne</span>
                </a>
              </li>
              <li className='locations__item'>
                <a className='locations__item-link tabs__item' href='#'>
                  <span>Brussels</span>
                </a>
              </li>
              <li className='locations__item'>
                <a className='locations__item-link tabs__item tabs__item--active'>
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className='locations__item'>
                <a className='locations__item-link tabs__item' href='#'>
                  <span>Hamburg</span>
                </a>
              </li>
              <li className='locations__item'>
                <a className='locations__item-link tabs__item' href='#'>
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className='cities'>
          <div className={containerClassName}>
            {isOffersExists ?
              <section className='cities__places places'>
                <h2 className='visually-hidden'>Places</h2>
                <b className='places__found'>{offers.length} places to stay in Amsterdam</b>
                <form className='places__sorting' action='#' method='get'>
                  <span className='places__sorting-caption'>Sort by</span>
                  <span className='places__sorting-type' tabIndex={0}>
                    Popular
                    <svg className='places__sorting-arrow' width='7' height='4'>
                      <use xlinkHref='#icon-arrow-select'></use>
                    </svg>
                  </span>
                  <ul className='places__options places__options--custom places__options--opened'>
                    <li className='places__option places__option--active' tabIndex={0}>Popular</li>
                    <li className='places__option' tabIndex={0}>Price: low to high</li>
                    <li className='places__option' tabIndex={0}>Price: high to low</li>
                    <li className='places__option' tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <MainOffersList offers={offers} />
              </section>
              :
              <NoPlacesSection />}
            <div className='cities__right-section'>
              {isOffersExists && <section className='cities__map map'></section>}
            </div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export const MainPageWithBrowserTitle = componentWithBrowserTitle(MainPage, PAGE_TITLE);
