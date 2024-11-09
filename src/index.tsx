import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './Components/App/App.tsx';
import {guestReview} from './mocks/review.js';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App guestReview={guestReview}/>
    </Provider>
  </React.StrictMode>
);
