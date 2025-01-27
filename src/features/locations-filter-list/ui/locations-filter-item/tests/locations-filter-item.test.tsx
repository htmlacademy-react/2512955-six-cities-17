import { OfferCityName } from '@entities/offer';
import { LocationsFilterItem } from '../locations-filter-item';
import { withRouter } from '@test-utills/hocs';
import { render } from '@testing-library/react';


describe('Component LocationsFilterItem', () => {
  const onLinkClickMock = vi.fn();
  const initialFilterValue: OfferCityName = 'Amsterdam';

  it('should correct render with active location', () => {
    const component = withRouter(<LocationsFilterItem filterValue={initialFilterValue} isActive onLinkClick={onLinkClickMock} />);

    const screen = render(component);

    expect(screen.getByText(initialFilterValue)).toBeInTheDocument();
    expect(screen.container.querySelector('.tabs__item--active')).not.toBeNull();
  });

  it('should correct render with no active location', () => {
    const component = withRouter(
      <LocationsFilterItem
        filterValue={initialFilterValue}
        isActive={false}
        onLinkClick={onLinkClickMock}
      />
    );

    const screen = render(component);

    expect(screen.getByText(initialFilterValue)).toBeInTheDocument();
    expect(screen.container.querySelector('.tabs__item--active')).toBeNull();
  });
});
