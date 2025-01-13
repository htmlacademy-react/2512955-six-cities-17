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
}>

export function OffersList({ offers, className, onActivateOffer, viewType = 'main' }: OffersListProps): JSX.Element {
  const { authorizationStatus } = useAuthorization();
  const navigate = useNavigate();

  /**
   * @todo Допилить когда буду делать реальное добавление в избранное
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const favoritesButtonCLickHandler = (_offerId: string) => {
    if (authorizationStatus !== AuthorizationStatusEnum.Authorized) {
      navigate(RoutesEnum.Login, { replace: true });
    }
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
          onFavoritesButtonClick={favoritesButtonCLickHandler}
        />))}
    </div>
  );
}
