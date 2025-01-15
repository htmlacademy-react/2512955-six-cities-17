import type { MainOfferInfo } from '@entities/offer';
import OfferCard, { type ViewType } from '@entities/offer';
import { useAuthorization } from '@entities/user';
import { AuthorizationStatusEnum, Classed, RoutesEnum } from '@shared/types';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

type OffersListProps = Classed<{
  offers: MainOfferInfo[];
  onActivateOffer?: (offerId: string) => void;
  viewType?: Exclude<ViewType, 'favorites'>;
  onFavoriteClick: (offerId: string, isFavorite: boolean) => void;
}>

export function OffersList({ offers, className, onActivateOffer, viewType = 'main', onFavoriteClick }: OffersListProps): JSX.Element {
  const { authorizationStatus } = useAuthorization();
  const navigate = useNavigate();

  const favoritesButtonClickHandler = (offerId: string, isFavorite: boolean) => {
    if (authorizationStatus !== AuthorizationStatusEnum.Authorized) {
      navigate(RoutesEnum.Login, { replace: true });
      return;
    }

    onFavoriteClick(offerId, isFavorite);
  };

  const listClassName = classNames(
    {
      'cities__places-list': viewType === 'main',
      'near-places__list': viewType === 'near'
    },
    'places__list',
    className
  );

  return (
    <div className={listClassName}>
      {offers.map((current) => (
        <OfferCard
          offer={current}
          key={current.id}
          viewType={viewType}
          onActivateOffer={onActivateOffer}
          onFavoritesButtonClick={favoritesButtonClickHandler}
        />))}
    </div>
  );
}
