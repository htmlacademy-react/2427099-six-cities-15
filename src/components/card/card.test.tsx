import { screen } from '@testing-library/react';
import { makeFakeOffer } from '@utils/mocks';
import Card from './card';
import { renderWithRouterAndProviders } from '@utils/mock-component';

describe('Component: Card', () => {
  const offer = makeFakeOffer();

  it('should render place card', () => {
    renderWithRouterAndProviders(<Card offer={offer} block="place" />);

    expect(screen.getByTestId('place-card')).toBeInTheDocument();
  });

  it('should render favorites card', () => {
    renderWithRouterAndProviders(<Card offer={offer} block="favorites" size='small' />);

    expect(screen.getByTestId('favorites-card')).toBeInTheDocument();
  });

  it('should render near place card', () => {
    renderWithRouterAndProviders(<Card offer={offer} block="near-places" />);

    expect(screen.getByTestId('near-places-card')).toBeInTheDocument();
  });
});
