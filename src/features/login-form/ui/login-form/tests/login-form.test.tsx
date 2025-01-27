import userEvent from '@testing-library/user-event';
import { LoginForm } from '../login-form';
import { render } from '@testing-library/react';
import faker from 'faker';

const VALID_PASSWORD = 'q1';
const VALID_EMAIL = faker.internet.email();

describe('Component LoginForm', () => {
  const emailPlaceholder = /email/i;
  const passwordPlaceholder = /password/i;
  const submitButtonText = /sign in/i;
  const onSubmitMock = vi.fn();

  beforeEach(() => {
    onSubmitMock.mockReset();
  });

  it('shoult correct render', () => {
    const screen = render(
      <LoginForm onSubmit={onSubmitMock} />
    );

    expect(screen.getByPlaceholderText(emailPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordPlaceholder)).toBeInTheDocument();
    expect(screen.getByText(submitButtonText)).toBeInTheDocument();
  });

  it('allows you to enter email', async () => {
    const screen = render(
      <LoginForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(
      screen.getByPlaceholderText(emailPlaceholder),
      VALID_EMAIL
    );

    expect(screen.getByDisplayValue(VALID_EMAIL)).toBeInTheDocument();
  });

  it('allows you to enter password', async () => {
    const screen = render(
      <LoginForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(
      screen.getByPlaceholderText(passwordPlaceholder),
      VALID_PASSWORD
    );

    expect(screen.getByDisplayValue(VALID_PASSWORD)).toBeInTheDocument();
  });

  it('should not call "onSumbit" function with email not valid', async () => {
    const invalidEmail = 't';
    const screen = render(
      <LoginForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(
      screen.getByPlaceholderText(emailPlaceholder),
      invalidEmail
    );
    await userEvent.type(
      screen.getByPlaceholderText(passwordPlaceholder),
      VALID_PASSWORD
    );
    await userEvent.click(
      screen.getByText(submitButtonText)
    );

    expect(onSubmitMock).not.toBeCalled();
  });

  it('should not call "onSumbit" function with password not valid', async () => {
    const invalidPassword = 'q';
    const screen = render(
      <LoginForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(
      screen.getByPlaceholderText(emailPlaceholder),
      VALID_EMAIL
    );
    await userEvent.type(
      screen.getByPlaceholderText(passwordPlaceholder),
      invalidPassword
    );
    await userEvent.click(
      screen.getByText(submitButtonText)
    );

    expect(onSubmitMock).not.toBeCalled();
  });

  it('should call "onSumbit" function with password and email is valid', async () => {
    const screen = render(
      <LoginForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(
      screen.getByPlaceholderText(emailPlaceholder),
      VALID_EMAIL
    );
    await userEvent.type(
      screen.getByPlaceholderText(passwordPlaceholder),
      VALID_PASSWORD
    );
    await userEvent.click(
      screen.getByText(submitButtonText)
    );

    expect(onSubmitMock).toBeCalledTimes(1);
  });
});
