import { Comment } from '../../types/comment';
import CommentItem from '../comment-item/comment-item';

type TListCommentsProps = {
  comments: Comment[];
}

function ListComments({ comments }: TListCommentsProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
    </ul>
  );
}

export default ListComments;
