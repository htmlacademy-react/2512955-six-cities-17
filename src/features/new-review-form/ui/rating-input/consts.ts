import { ElementSize } from '@shared/types';

export const enum RatingValue {
  Perfect = 5,
  Good = 4,
  NotBad = 3,
  Badly = 2,
  Terribly = 1
}

export const enum RatingTitle {
  Perfect = 'perfect',
  Good = 'good',
  NotBad = 'not bad',
  Badly = 'badly',
  Terribly = 'terribly'
}

export const INPUT_ELEMENT_SIZE: ElementSize = {
  height: 33,
  width: 37,
};