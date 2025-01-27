import { OfferSortingSelect } from '../offer-sorting-select';
import { render } from '@testing-library/react';
import { OfferSortType } from '@features/offer-sorting-select/model/types';
import { SUPPORTED_SORTING_TYPES, sortTypeToCaptionMap } from '@features/offer-sorting-select/config/const';
import userEvent from '@testing-library/user-event';

describe('Component OfferSortingSelect', () => {
  const listContainerTestId = 'sorting-list-container';
  const listItemTestId = 'sorting-list-item';
  const sortingInputTestId = 'sorting-input';
  const initSortingType = OfferSortType.Default;
  const changedSortingType = OfferSortType.IncreasePrice;
  const changeOfferSortingMock = vi.fn();

  beforeEach(() => {
    changeOfferSortingMock.mockReset();
  });

  it('should correct render if closed', async () => {
    vi.spyOn(await import('@features/offer-sorting-select/lib/use-offer-sorting'), 'useOfferSorting')
      .mockImplementation(() => ({
        activeSotingType: initSortingType,
        changeActiveSortType: changeOfferSortingMock
      }));

    const screen = render(<OfferSortingSelect />);

    expect(screen.getByTestId(sortingInputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(listContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(listItemTestId).length).toBe(SUPPORTED_SORTING_TYPES.length);
    expect(screen.container.querySelector('.places__options--opened')).toBeNull();
  });

  it('should correct render if opened', async () => {
    vi.spyOn(await import('@features/offer-sorting-select/lib/use-offer-sorting'), 'useOfferSorting')
      .mockImplementation(() => ({
        activeSotingType: initSortingType,
        changeActiveSortType: changeOfferSortingMock
      }));

    const screen = render(<OfferSortingSelect />);
    await userEvent.click(screen.getByTestId(sortingInputTestId));

    expect(screen.getByTestId(sortingInputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(listContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(listItemTestId).length).toBe(SUPPORTED_SORTING_TYPES.length);
    expect(screen.container.querySelector('.places__options--opened')).not.toBeNull();
  });

  it('should correct change sorting', async () => {
    vi.spyOn(await import('@features/offer-sorting-select/lib/use-offer-sorting'), 'useOfferSorting')
      .mockImplementation(() => ({
        activeSotingType: initSortingType,
        changeActiveSortType: changeOfferSortingMock
      }));

    const changedSortingCaption = sortTypeToCaptionMap.get(changedSortingType) ?? 'unknown sorting';
    const screen = render(<OfferSortingSelect />);
    await userEvent.click(screen.getByTestId(sortingInputTestId));
    await userEvent.click(screen.getByText(changedSortingCaption, {
      selector: '.places__option'
    }));

    expect(changeOfferSortingMock).toBeCalledTimes(1);
    expect(screen.container.querySelector('.places__options--opened')).toBeNull();
  });
});
