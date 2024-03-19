import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './app';
import comments from './mocks/comments';
import { store } from './store';
import { checkAuthAction, fetchOffersAction } from '@store/api-actions';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(checkAuthAction);
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer />
          <App comments={comments}/>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
