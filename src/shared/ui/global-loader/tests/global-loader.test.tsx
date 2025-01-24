import { GlobalLoader } from '../global-loader';
import { render } from '@testing-library/react';

type LoadingSelectorType = () => boolean;

vi.mock('@shared/lib/store', () => ({
  useAppSelector: vi.fn<[LoadingSelectorType], boolean>((selector) => selector())
}));

describe('Component GlobalLoader', () => {
  const loaderContainerTestId = 'global-loader-container';
  const spinnerTestId = 'spinner';
  const falseReturnSelectorMock = vi.fn(() => false);
  const trueReturnSelectorMock = vi.fn(() => true);

  it('shold correct render with inner loading', async () => {
    vi.spyOn(await import('@shared/model/global-loader-slice'), 'getLoaderSelector').mockImplementation(() => true);

    const screen = render(
      <GlobalLoader
        authorizationLoadingSelector={falseReturnSelectorMock}
        favoritesOffersLoadingSelector={falseReturnSelectorMock}
        mainOffersLoadingSelector={falseReturnSelectorMock}
        offerPageLoadingSelector={falseReturnSelectorMock}
      />);

    expect(screen.getByTestId(loaderContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
  });

  it('shold correct render with no loading', async () => {
    vi.spyOn(await import('@shared/model/global-loader-slice'), 'getLoaderSelector').mockImplementation(() => false);

    const screen = render(
      <GlobalLoader
        authorizationLoadingSelector={falseReturnSelectorMock}
        favoritesOffersLoadingSelector={falseReturnSelectorMock}
        mainOffersLoadingSelector={falseReturnSelectorMock}
        offerPageLoadingSelector={falseReturnSelectorMock}
      />);

    expect(screen.getByTestId(loaderContainerTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(spinnerTestId)).toBeNull();
  });

  it('shold correct render with authorization loading', async () => {
    vi.spyOn(await import('@shared/model/global-loader-slice'), 'getLoaderSelector').mockImplementation(() => false);

    const screen = render(
      <GlobalLoader
        authorizationLoadingSelector={trueReturnSelectorMock}
        favoritesOffersLoadingSelector={falseReturnSelectorMock}
        mainOffersLoadingSelector={falseReturnSelectorMock}
        offerPageLoadingSelector={falseReturnSelectorMock}
      />
    );

    expect(screen.getByTestId(loaderContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
  });

  it('shold correct render with favorites offers loading', async () => {
    vi.spyOn(await import('@shared/model/global-loader-slice'), 'getLoaderSelector').mockImplementation(() => false);

    const screen = render(
      <GlobalLoader
        authorizationLoadingSelector={falseReturnSelectorMock}
        favoritesOffersLoadingSelector={trueReturnSelectorMock}
        mainOffersLoadingSelector={falseReturnSelectorMock}
        offerPageLoadingSelector={falseReturnSelectorMock}
      />
    );

    expect(screen.getByTestId(loaderContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
  });

  it('shold correct render with main offers loading', async () => {
    vi.spyOn(await import('@shared/model/global-loader-slice'), 'getLoaderSelector').mockImplementation(() => false);

    const screen = render(
      <GlobalLoader
        authorizationLoadingSelector={falseReturnSelectorMock}
        favoritesOffersLoadingSelector={falseReturnSelectorMock}
        mainOffersLoadingSelector={trueReturnSelectorMock}
        offerPageLoadingSelector={falseReturnSelectorMock}
      />
    );

    expect(screen.getByTestId(loaderContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
  });

  it('shold correct render with offer page loading', async () => {
    vi.spyOn(await import('@shared/model/global-loader-slice'), 'getLoaderSelector').mockImplementation(() => false);

    const screen = render(
      <GlobalLoader
        authorizationLoadingSelector={falseReturnSelectorMock}
        favoritesOffersLoadingSelector={falseReturnSelectorMock}
        mainOffersLoadingSelector={falseReturnSelectorMock}
        offerPageLoadingSelector={trueReturnSelectorMock}
      />
    );

    expect(screen.getByTestId(loaderContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
  });
});
