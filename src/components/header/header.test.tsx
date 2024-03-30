import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const headerTestId = 'header';

    renderWithRouterAndProviders(<Header isLoginNav/>);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
  });
});
