import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../project/Components/App.jsx';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const props = {
  premium:[true,false,false,true,false],
  price:[120,80,132,180,80],
  img:[
    '../markup/img/apartment-01.jpg',
    '../markup/img/room.jpg',
    '../markup/img/apartment-02.jpg',
    '../markup/img/apartment-03.jpg',
    '../markup/img/room.jpg'
  ],
  apartsmentType:['Apartment', 'Room', 'Apartment', 'Apartment', 'Room'],
  description:[
    'Beautiful &amp; luxurious apartment at great location',
    'Wood and stone place',
    'Canal View Prinsengracht',
    'Nice, cozy, warm big bed apartment',
    'Wood and stone place'
  ],
  numberOfPlaces:132
};

root.render(
  <React.StrictMode>
    <App premium = {props.premium} price = {props.price} img = {props.img} apartsmentType = {props.apartsmentType} description = {props.description} numberOfPlaces = {props.numberOfPlaces}/>
  </React.StrictMode>
);
