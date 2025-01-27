import { OfferCityName } from '@entities/offer';
import { LocationsFilterList } from '../locations-filter-list';
import { withRouter } from '@test-utills/hocs';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component LocationsFilterList', () => {
  const initLocation: OfferCityName = 'Paris';
  const changedLocation: OfferCityName = 'Cologne';
  const allLocations: OfferCityName[] = [initLocation, changedLocation];
  const filterContainerTestId = 'locations-filter-container';
  const filterItemTestId = 'locations-filter-item';
  const onFilterChangeMock = vi.fn();
  const changeActiveLocationMock = vi.fn();

  beforeEach(() => {
    onFilterChangeMock.mockReset();
    changeActiveLocationMock.mockReset();
  });

  it('should correct render', async () => {
    vi.spyOn(await import('@features/locations-filter-list/lib/use-active-location'), 'useActiveLocation')
      .mockImplementation(() => ({
        activeLocation: initLocation,
        changeActiveLocation: changeActiveLocationMock
      }));
    const component = withRouter(
      <LocationsFilterList
        allFilterItems={allLocations}
        onFilterChange={onFilterChangeMock}
      />
    );

    const screen = render(component);

    expect(screen.getByTestId(filterContainerTestId)).toBeInTheDocument();
    expect(screen.queryAllByTestId(filterItemTestId).length).toBe(allLocations.length);
  });

  it('not call change location callbacks if clicked = init location', async () => {
    vi.spyOn(await import('@features/locations-filter-list/lib/use-active-location'), 'useActiveLocation')
      .mockImplementation(() => ({
        activeLocation: initLocation,
        changeActiveLocation: changeActiveLocationMock
      }));
    const component = withRouter(
      <LocationsFilterList
        allFilterItems={allLocations}
        onFilterChange={onFilterChangeMock}
      />
    );

    const screen = render(component);
    await userEvent.click(screen.getByText(initLocation));

    expect(onFilterChangeMock).not.toBeCalled();
    expect(changeActiveLocationMock).not.toBeCalled();
  });

  it('call change location callbacks if clicked != init location', async () => {
    vi.spyOn(await import('@features/locations-filter-list/lib/use-active-location'), 'useActiveLocation')
      .mockImplementation(() => ({
        activeLocation: initLocation,
        changeActiveLocation: changeActiveLocationMock
      }));
    const component = withRouter(
      <LocationsFilterList
        allFilterItems={allLocations}
        onFilterChange={onFilterChangeMock}
      />
    );

    const screen = render(component);
    await userEvent.click(screen.getByText(changedLocation));

    expect(onFilterChangeMock).toBeCalledTimes(1);
    expect(changeActiveLocationMock).toBeCalledTimes(1);
  });
});
