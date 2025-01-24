import { OfferHostInfo } from '../offer-host-info';
import { createOfferHostMock } from '@test-utills/mock/offer';
import { render } from '@testing-library/react';

describe('Component OfferHostInfo', () => {
  const sectionHeader = 'Meet the host';
  const avatarAlt = 'Host avatar';
  const proSpanText = 'Pro';

  it('should correct render by is not pro host', () => {
    const hostMock = createOfferHostMock();
    hostMock.isPro = false;

    const screen = render(<OfferHostInfo host={hostMock} />);

    expect(screen.getByText(sectionHeader)).toBeInTheDocument();
    expect(screen.getByAltText(avatarAlt)).toBeInTheDocument();
    expect(screen.queryByText(proSpanText)).toBeNull();
  });

  it('should correct render by is pro host', () => {
    const hostMock = createOfferHostMock();
    hostMock.isPro = true;

    const screen = render(<OfferHostInfo host={hostMock} />);

    expect(screen.getByText(sectionHeader)).toBeInTheDocument();
    expect(screen.getByAltText(avatarAlt)).toBeInTheDocument();
    expect(screen.getByText(proSpanText)).toBeInTheDocument();
  });

  it('should correct render by children', () => {
    const hostMock = createOfferHostMock();
    const childernParagraphText = 'Children test paragraph';

    const screen = render(
      <OfferHostInfo host={hostMock}>
        <p>{childernParagraphText}</p>
      </OfferHostInfo>
    );

    expect(screen.getByText(childernParagraphText)).toBeInTheDocument();
  });
});
