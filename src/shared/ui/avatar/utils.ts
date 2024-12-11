import classNames from 'classnames';
import type { AvatarType } from './types';

type AvatarStyles = {
  wrapperStyles: string;
  imgStyles: string;
  spanStyles: string;
}

export const getAvatarStyles = (isPro: boolean, type: AvatarType): AvatarStyles => ({
  wrapperStyles: classNames(
    {
      'offer__avatar-wrapper': type === 'offer',
      'offer__avatar-wrapper--pro': type === 'offer' && isPro,
      'reviews__avatar-wrapper': type === 'review',
    },
    'user__avatar-wrapper'),
  imgStyles: classNames(
    {
      'offer__avatar': type === 'offer',
      'reviews__avatar': type === 'review',
    },
    'user__avatar'
  ),
  spanStyles: classNames(
    {
      'offer__user-name': type === 'offer',
      'reviews__user-name': type === 'review'
    }
  )
});
