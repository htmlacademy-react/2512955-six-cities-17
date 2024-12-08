import classNames from 'classnames';

type PageStyles = {
  contentClassName: string;
  containerClassName: string;
}

export function getPageStyles(isOffersExists: boolean): PageStyles {
  return {
    contentClassName: classNames(
      'page__main--index',
      {
        'page__main--index-empty': !isOffersExists
      }
    ),
    containerClassName: classNames(
      'cities__places-container',
      {
        'cities__places-container--empty': !isOffersExists
      },
      'container'
    )
  };
}
