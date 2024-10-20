import React from 'react';
import { OfferDescription } from '../../src/types/offerDescription.ts';
import MainPageCard from './MainPageCard.tsx';


function OfferList(offer:OfferDescription[]){
    return(
        <div className="cities__places-list places__list tabs__content">
            <MainPageCard {...offer[0]}/>
            <MainPageCard {...offer[1]}/>
            <MainPageCard {...offer[2]}/>
            <MainPageCard {...offer[3]}/>
            <MainPageCard {...offer[1]}/>
        </div>
    )
}
export default OfferList;