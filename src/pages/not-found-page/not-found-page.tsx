import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Fragment>
      <h2>404 Not Found</h2>
      <Link to='/'>Go to main page</Link>
    </Fragment>
  );
}
