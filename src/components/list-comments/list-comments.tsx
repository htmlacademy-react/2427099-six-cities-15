import { Comment } from '@type/comment';
import { sortCommentsByDate } from '@utils/common';
import CommentItem from '../comment-item/comment-item';
import { COMMENTS_COUNT } from '@const';

type TListCommentsProps = {
  comments: Comment[];
}

function ListComments({ comments }: TListCommentsProps): JSX.Element {
  const sortedComments = sortCommentsByDate(comments).slice(0, COMMENTS_COUNT);
  return (
    <ul className="reviews__list">
      {sortedComments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
    </ul>
  );
}

export default ListComments;
