import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '@utils/mocks';
import ListComments from './list-comments';

describe('Component: List comments', () => {
  it('should render correctly', () => {
    const comment = makeFakeComment();
    const commentListTestId = 'reviews-list';

    render(
      <ListComments comments={[comment]} />
    );

    expect(screen.getByTestId(commentListTestId)).toBeInTheDocument();
  });
});
