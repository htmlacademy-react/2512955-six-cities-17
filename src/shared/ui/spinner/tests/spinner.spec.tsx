import { Spinner } from '../spinner';
import { render, screen } from '@testing-library/react';


describe('Component Spinner', () => {
  const spinnerTestId = 'spinner';

  it('should correct render with is active', () => {
    render(
      <Spinner isActive />
    );

    expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
  });

  it('should correct render with no active', () => {
    render(
      <Spinner isActive={false} />
    );

    expect(screen.queryByTestId(spinnerTestId)).toBeNull();
  });
});
