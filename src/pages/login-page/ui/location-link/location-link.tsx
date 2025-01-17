import { Link, type To } from 'react-router-dom';

type LocationLinkProps = {
  to: To;
  caption: string;
}

export function LocationLink({ to, caption }: LocationLinkProps) {
  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={to}>
          <span>{caption}</span>
        </Link>
      </div>
    </section>
  );
}
