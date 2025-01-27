import { LeafletMap } from '../leaflet-map';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { render } from '@testing-library/react';
import { LeafletPoint } from '@shared/hooks/use-map';
import faker from 'faker';

const POINTS_COUNT = 10;
const POINTS_MOCK: LeafletPoint[] = Array.from({length: POINTS_COUNT})
  .map(() => {
    const offer = createMainOfferInfoMock();
    return {
      location: offer.location,
      name: offer.title
    };
  });

const MAP_CENTER = POINTS_MOCK[0];

const getLeafletIconsElements = (mapContainer: HTMLElement, isActiveIcons: boolean): Element[] => {
  const mapIconSelector = 'img.leaflet-marker-icon';
  const inactivePointSrc = 'img/pin.svg';
  const activePointSrc = 'img/pin-active.svg';

  const comparedSrc = isActiveIcons ? activePointSrc : inactivePointSrc;

  return Array.from(mapContainer.querySelectorAll(mapIconSelector))
    .filter((current) => current.getAttribute('src') === comparedSrc);
};

describe('Component LeafletMap', () => {
  const mapContainerTestId = 'leaflet-map';

  it('should correct render without \'selectedPoint\' prop', () => {
    const screen = render(
      <LeafletMap center={MAP_CENTER} points={POINTS_MOCK} />
    );

    expect(screen.getByTestId(mapContainerTestId));
    expect(getLeafletIconsElements(screen.container, false).length).toBe(POINTS_COUNT);
  });

  it('should correct render with \'selectedPoint\' prop which contains into \'points\' prop', () => {
    const selectedPointIndex = faker.datatype.number({min: 0, max: POINTS_COUNT - 1});

    const screen = render(
      <LeafletMap center={MAP_CENTER} points={POINTS_MOCK} selectedPoint={POINTS_MOCK[selectedPointIndex]} />
    );

    expect(screen.getByTestId(mapContainerTestId));
    expect(getLeafletIconsElements(screen.container, false).length).toBe(POINTS_COUNT - 1);
    expect(getLeafletIconsElements(screen.container, true).length).toBe(1);
  });

  it('should correct render with \'selectedPoint\' prop which not contains into \'points\' prop', () => {
    const offerMock = createMainOfferInfoMock();
    const offerPoint: LeafletPoint = {
      location: offerMock.location,
      name: offerMock.title
    };

    const screen = render(
      <LeafletMap center={MAP_CENTER} points={POINTS_MOCK} selectedPoint={offerPoint} />
    );

    expect(screen.getByTestId(mapContainerTestId));
    expect(getLeafletIconsElements(screen.container, false).length).toBe(POINTS_COUNT);
    expect(getLeafletIconsElements(screen.container, true).length).toBe(0);
  });
});
