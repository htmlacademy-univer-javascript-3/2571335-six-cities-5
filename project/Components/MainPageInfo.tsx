
type mainPageTypes={
  premium:boolean,
  price:number,
  img:string,
  apartsmentType:string,
  description:string,
  numberOfPlaces?:number
};
export type {mainPageTypes};

const mainPageCardInfo:mainPageTypes[]=[
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