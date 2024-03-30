import { renderWithRouterAndProviders } from '@utils/mock-component';
import App from './app';
import { screen, waitFor } from '@testing-library/react';
import { AppRoute } from '@const';
import { makeFakeUser } from '@utils/mocks';
import { setupStore } from './store';
import { loginAction } from '@store/thunks/auth';

describe('Application Routing', () => {
  it('should render "Main page" when user navigate to "/"', async () => {
    const expectedTestId = 'main-tabs';
    renderWithRouterAndProviders(<App />, { route: AppRoute.Root });

    await waitFor(() => expect(screen.getByTestId(expectedTestId)).toBeInTheDocument());
  });

  it('should render "Auth page" when user navigate to "/login"', () => {
    const expectedTestId = 'login-section';
    renderWithRouterAndProviders(<App />, { route: AppRoute.Login });

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should render "Favorites page" when user navigate to "/favorites"', async () => {
    const user = makeFakeUser();
    const store = setupStore();
    store.dispatch(loginAction.fulfilled(user, '', { email: 'test@test.com', password: '123456i'}));
    const expectedTestId = 'favorites-empty';
    renderWithRouterAndProviders(<App />, { route: AppRoute.Favorites, store });

    await waitFor(() => expect(screen.getByTestId(expectedTestId)).toBeInTheDocument());
  });

  it('should render "Offer page" when user navige to "/offer:id"', async () => {
    const expectedTestId = 'offer-section';
    renderWithRouterAndProviders(<App />, { route: `${AppRoute.Offer}/4c057f36-5f82-4bc2-94cf-f56bf7f985dc` });

    await waitFor(() => expect(screen.getByTestId(expectedTestId)).toBeInTheDocument());
  });

  it('should render "Not found page" when user navigate to non-existent route', () => {
    const expectedHeaderText = '404 Not Found';
    const expectedLinkText = 'Go to main page';
    renderWithRouterAndProviders(<App />, { route: '/non-existent-route' });

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
