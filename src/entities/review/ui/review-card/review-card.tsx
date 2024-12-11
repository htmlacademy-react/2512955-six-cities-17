import type { Review } from '@entities/review/model/types';
import type { ElementSize } from '@shared/types';
import RatingInStars from '@shared/ui/rating-in-stars';
import { Avatar } from '@shared/ui/avatar';

type ReviewCardPros = {
  review: Review;
}

const AVATAR_SIZE: ElementSize = {
  height: 54,
  width: 54
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long'
});

const getDateDescription = (date: number): string => {
  let result = dateFormatter.format(date);
  const matches = /\s\d{2},/g.exec(dateFormatter.format(date));
  matches?.forEach((current) => {
    result = result.replace(current, '');
  });
  return result;
};

export function ReviewCard({ review }: ReviewCardPros) {
  const { user, ...otherInfo } = review;
  return (
    <>
      <div className='reviews__user user'>
        <Avatar
          alt='Reviews avatar'
          avatarUrl={user.avatarUrl}
          description={user.name}
          imageSize={AVATAR_SIZE}
          isPro={user.isPro}
          type='review'
        />
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <RatingInStars className='reviews__stars rating__stars' rating={otherInfo.rating} />
        </div>
        <p className='reviews__text'>
          {otherInfo.comment}
        </p>
        <time className='reviews__time' dateTime={otherInfo.date}>{getDateDescription(Date.parse(otherInfo.date))}</time>
      </div>
    </>
  );
}
