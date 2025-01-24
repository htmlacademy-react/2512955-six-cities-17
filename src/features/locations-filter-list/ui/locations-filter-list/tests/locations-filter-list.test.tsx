import { OfferCityName } from '@entities/offer';
import { LocationsFilterList } from '../locations-filter-list';
import { withRouter } from '@test-utills/hocs';
import { render } from '@testing-library/react';

vi.mock('@features/locations-filter-list/lib/use-active-location', () => ({
  useActiveLocation: vi.fn(() => ({
    activeLocation: 'Paris',
    changeActiveLocation: vi.fn()
  }))
}));

describe('Component LocationsFilterList', () => {
  const allLocations: OfferCityName[] = ['Paris', 'Cologne'];
  const filterContainerTestId = 'locations-filter-container';
  const filterItemTestId = 'locations-filter-item';

  it('should correct render', () => {
    const onFilterChangeMock = vi.fn();
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
});
