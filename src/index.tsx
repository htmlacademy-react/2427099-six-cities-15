import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import App from './app';
import comments from './mocks/comments';
import { store } from './store';
import { fetchOffersAction } from '@store/api-actions';

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App comments={comments}/>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
