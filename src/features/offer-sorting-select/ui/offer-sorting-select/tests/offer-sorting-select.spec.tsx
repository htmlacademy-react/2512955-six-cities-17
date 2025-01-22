import { OfferSortingSelect } from '../offer-sorting-select';
import { render } from '@testing-library/react';
import { OfferSortType } from '@features/offer-sorting-select/model/types';
import { sortTypeToCaptionMap, SUPPORTED_SORTING_TYPES } from '@features/offer-sorting-select/config/const';

vi.mock('@features/offer-sorting-select/lib/use-offer-sorting', () => ({
  useOfferSorting: vi.fn(() => ({
    activeSotingType: OfferSortType.DecreaseRating,
    changeActiveSortType: vi.fn()
  }))
}));

describe('Component OfferSortingSelect', () => {
  const listContainerTestId = 'sorting-list-container';
  const listItemTestId = 'sorting-list-item';

  it('should correct render if closed', () => {
    const screen = render(<OfferSortingSelect />);
    const caption = sortTypeToCaptionMap.get(OfferSortType.DecreasePrice) ?? 'unknown sorting';

    expect(screen.getByText(caption)).toBeInTheDocument();
    expect(screen.getByTestId(listContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(listItemTestId).length).toBe(SUPPORTED_SORTING_TYPES.length);
    expect(screen.container.querySelector('.places__options--opened')).toBeNull();
  });
});
