import { App } from '../application';
import { render } from '@testing-library/react';

vi.mock('../use-startup', () => ({
  useStartup: vi.fn()
}));

vi.mock('react-toastify', () => ({
  ToastContainer: () => <p>Fake toast container</p>,
  Bounce: vi.fn()
}));

vi.mock('@shared/ui/global-loader', () => ({
  GlobalLoader: () => <p>Fake global loader</p>
}));

vi.mock('@app/routers', () => ({
  default: () => <p>Fake router provider</p>
}));

const FAKE_TOAST_TEXT = 'Fake toast container';
const FAKE_LOADER_TEXT = 'Fake global loader';
const FAKE_ROUTER_TEXT = 'Fake router provider';

describe('Component App', () => {
  it('should correct render', () => {
    const screen = render(
      <App />
    );

    expect(screen.getByText(FAKE_TOAST_TEXT)).toBeInTheDocument();
    expect(screen.getByText(FAKE_LOADER_TEXT)).toBeInTheDocument();
    expect(screen.getByText(FAKE_ROUTER_TEXT)).toBeInTheDocument();
  });
});
