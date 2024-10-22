import { OfferDescription } from '../../src/types/offerDescription.ts';
import MainPageCard from './MainPageCard.tsx';


function OfferList(offer:OfferDescription[]){
    return(
        <div className="cities__places-list places__list tabs__content">
            <MainPageCard offer = {offer[0]}
            onAnswer={() => {
                  throw new Error('Function \'onAnswer\' isn\'t implemented.');
                }}/ >
            <MainPageCard offer = {offer[1]}
            onAnswer={() => {
                throw new Error('Function \'onAnswer\' isn\'t implemented.');
              }}/ >

            <MainPageCard offer = {offer[2]}
            onAnswer={() => {
                throw new Error('Function \'onAnswer\' isn\'t implemented.');
              }}/ >

            <MainPageCard offer = {offer[3]}
            onAnswer={() => {
                throw new Error('Function \'onAnswer\' isn\'t implemented.');
              }}/ >

            <MainPageCard offer = {offer[1]}
            onAnswer={() => {
                throw new Error('Function \'onAnswer\' isn\'t implemented.');
              }}/ >

        </div>
    )
}
export default OfferList;