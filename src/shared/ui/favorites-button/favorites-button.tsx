import { ElementSize } from '@shared/types';

type FavoritesButtonProps = {
  onFavoritesClick?: () => void;
  buttonClassName: string;
  iconClassName: string;
  iconSize: ElementSize;
  isFavorite: boolean;
};

export function FavoritesButton({
  buttonClassName,
  iconClassName,
  onFavoritesClick,
  iconSize,
  isFavorite
}: FavoritesButtonProps): JSX.Element {
  return (
    <button className={buttonClassName} type='button' onClick={onFavoritesClick && onFavoritesClick} data-testid='favorite-button'>
      <svg className={iconClassName} width={iconSize.width} height={iconSize.height}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>{isFavorite ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}
