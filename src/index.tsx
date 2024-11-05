import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App.tsx';
import {offer} from './mocks/offer.js';
import {guestReview} from './mocks/review.js';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


type mainPageTypes={
    numberOfPlaces:number;
};
export type {mainPageTypes};

const mainPageCardInfo:mainPageTypes = {
  numberOfPlaces:312
};
export default {mainPageCardInfo} ;


root.render(
  <React.StrictMode>
    <App MainPageCardProps={mainPageCardInfo} guestReview={guestReview} offer ={offer}/>
  </React.StrictMode>
);
