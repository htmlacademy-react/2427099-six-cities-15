import { screen } from '@testing-library/react';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import Sort from './sort';
import { SortTypeOption } from '@const';

describe('Component: SortBy', () => {
  it('should render correctly', () => {
    const sortTestId = 'sort';

    renderWithRouterAndProviders(<Sort currentType={SortTypeOption.Popular} setter={(option) => option} />);

    expect(screen.getByTestId(sortTestId)).toBeInTheDocument();
  });
});
