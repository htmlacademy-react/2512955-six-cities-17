import { GlobalLoader } from '../global-loader';
import { render } from '@testing-library/react';
import { withStore } from '@test-utills/hocs';

describe('Component GlobalLoader', () => {
  const loaderContainerTestId = 'global-loader-container';
  const spinnerTestId = 'spinner';

  it('shold correct render with loading', () => {
    const { wrappedComponent } = withStore(
      <GlobalLoader />,
      { loading: { loading: true } }
    );

    const screen = render(wrappedComponent);

    expect(screen.getByTestId(loaderContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
  });

  it('shold correct render with no loading', () => {
    const { wrappedComponent } = withStore(
      <GlobalLoader />,
      { loading: { loading: false } }
    );

    const screen = render(wrappedComponent);
    expect(screen.getByTestId(loaderContainerTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(spinnerTestId)).toBeNull();
  });
});
