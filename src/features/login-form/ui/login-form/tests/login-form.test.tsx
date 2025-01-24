import { LoginForm } from '../login-form';
import { render, screen } from '@testing-library/react';

describe('Component LoginForm', () => {
  const emailPlaceholder = /email/i;
  const passwordPlaceholder = /password/i;
  const submitButtonText = /sign in/i;
  const onSubmitMock = vi.fn();

  it('shoult correct render', () => {
    render(
      <LoginForm onSubmit={onSubmitMock} />
    );

    expect(screen.getByPlaceholderText(emailPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordPlaceholder)).toBeInTheDocument();
    expect(screen.getByText(submitButtonText)).toBeInTheDocument();
  });
});
