import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './components/app/app.tsx';
import {store} from './store/index.ts';
import { checkAuthAction, fetchOffers, getFavourites } from './store/api-actions.ts';
import { getToken } from './services/token.ts';
import browserHistory from './services/browser-history.ts';
import HistoryRouter from './components/history-router/history-router.tsx';

store.dispatch(checkAuthAction(getToken()));
store.dispatch(fetchOffers());
store.dispatch(getFavourites(getToken()));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer/>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
