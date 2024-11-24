import { Classed } from '@shared/types';
import { percentOfNumber } from '@shared/lib/converters';

const MAX_STARS = 5;

type RatingInStarsProps = Classed<{
  rating: number;
  maxStars?: number;
}>

export function RatingInStars({ rating, className, maxStars = MAX_STARS }: RatingInStarsProps): JSX.Element {
  return (
    <div className={className}>
      <span style={{ width: `${percentOfNumber(rating, maxStars)}%` }}></span>
      <span className='visually-hidden'>Rating</span>
    </div>
  );
}
