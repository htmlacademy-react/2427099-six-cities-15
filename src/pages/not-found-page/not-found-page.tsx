import { Link } from 'react-router-dom';
import { AppRoute } from '@const';
import { Helmet } from 'react-helmet-async';
import './not-found-page.css'; // Импорт стилей

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <Helmet>
        <title>6 cities: 404 Not Found</title>
      </Helmet>
      <h2>404 Not Found</h2>
      <Link to={AppRoute.Root}>Go to main page</Link>
    </div>
  );
}

export default NotFoundPage;
