import { RatingInStars } from '../rating-in-stars';
import faker from 'faker';
import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { RatingValue } from '@shared/types';

const createComponentPropsMock = (): ComponentProps<typeof RatingInStars> => ({
  rating: faker.datatype.number({min: RatingValue.Terribly, max: RatingValue.Perfect}),
  maxStars: RatingValue.Perfect
});

describe('Component RatingInStars', () => {
  const starTestId = 'rating-star';

  it('should correct render', () => {
    const propsMock = createComponentPropsMock();

    render(
      <RatingInStars rating={propsMock.rating} />
    );

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByTestId(starTestId)).toBeInTheDocument();
  });
});
