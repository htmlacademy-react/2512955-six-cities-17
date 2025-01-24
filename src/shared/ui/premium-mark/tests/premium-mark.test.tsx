import { PremiumMark } from '../premium-mark';
import faker from 'faker';
import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';

const createPremiumMarkPropsMock = (): ComponentProps<typeof PremiumMark> => ({
  markText: faker.lorem.word(),
});

describe('Component PremiumMark', () => {
  it('should correct render with mark prop', () => {
    const markPropsMock = createPremiumMarkPropsMock();

    render(
      <PremiumMark markText={markPropsMock.markText} />
    );

    expect(screen.getByText(markPropsMock.markText ?? '')).toBeInTheDocument();
  });

  it('should correct render without mark prop', () => {
    render(
      <PremiumMark />
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });
});
