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

  it('should correct render', () => {
    const onFilterChangeMock = vi.fn();
    const component = withRouter(
      <LocationsFilterList
        allFilterItems={allLocations}
        onFilterChange={onFilterChangeMock}
      />
    );

    const screen = render(component);

    expect(screen.container.querySelector('.locations__list.tabs__list')).not.toBeNull();
    expect(screen.container.querySelectorAll('.locations__item').length).toBe(allLocations.length);
  });
});
