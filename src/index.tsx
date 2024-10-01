import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../project/Components/App.jsx';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


type mainPageTypes={
  premium:boolean;
  price:number;
  img:string;
  apartsmentType:string;
  description:string;
  numberOfPlaces?:number;
};
export type {mainPageTypes};

const mainPageCardInfo:mainPageTypes[] = [
  {
    premium:true,
    price:120,
    img:'../markup/img/apartment-01.jpg',
    apartsmentType:'Apartment',
    description:'Beautiful &amp; luxurious apartment at great location',
    numberOfPlaces:132
  },
  {
    premium:false,
    price:80,
    img:'../markup/img/room.jpg',
    apartsmentType:'Room',
    description:'Wood and stone place',
  },

  {
    premium:false,
    price:132,
    img:'../markup/img/apartment-02.jpg',
    apartsmentType:'Apartment',
    description:'Canal View Prinsengracht',
  },

  {
    premium:true,
    price:180,
    img:'../markup/img/apartment-03.jpg',
    apartsmentType:'Apartment',
    description:'Nice, cozy, warm big bed apartment',
  },

  {
    premium:false,
    price:80,
    img:'../markup/img/room.jpg',
    apartsmentType:'Room',
    description:'Wood and stone place',
  }];
export default {mainPageCardInfo} ;


root.render(
  <React.StrictMode>
    <App MainPageCardProps={mainPageCardInfo}/>
  </React.StrictMode>
);
