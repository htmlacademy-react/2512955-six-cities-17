import { Link } from 'react-router-dom';
import { getCityName } from './get-city-name';
import { RoutesEnum } from '@shared/types';

export function LocationLink() {
  const cityName = getCityName();
  const linkAddress = `${RoutesEnum.Main}?activeCity=${cityName}`;

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={linkAddress}>
          <span>{cityName}</span>
        </Link>
      </div>
    </section>
  );
}
