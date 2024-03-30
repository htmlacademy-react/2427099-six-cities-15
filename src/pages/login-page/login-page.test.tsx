import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import LoginPage from './login-page';

describe('Login page', () => {
  it('should render correctly', () => {
    renderWithRouterAndProviders(<LoginPage />);

    expect(screen.getByTestId('login-section')).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    renderWithRouterAndProviders(<LoginPage />);

    const loginInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button');

    const expectedEmail = 'test@test.com';
    const expectedPassword = '123456';

    await userEvent.type(
      loginInput,
      expectedEmail
    );

    await userEvent.type(
      passwordInput,
      expectedPassword
    );

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(loginInput).toHaveValue(expectedEmail);
    expect(passwordInput).toHaveValue(expectedPassword);
  });
});
