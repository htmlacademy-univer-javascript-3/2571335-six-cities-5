import { OfferDescription } from '../../types/offerDescription.ts';
import MainPageCard from '../MainPageCard/MainPageCard.tsx';

type OfferListProps = {
  onListItemHover: (listItemName: string) => void;
  offer:OfferDescription[];
  isMainPage:boolean;
  city:string;
  favouriteList: OfferDescription[];
};

function OfferList(OfferListProps:OfferListProps){
  const { onListItemHover, offer , isMainPage,city, favouriteList} = OfferListProps;

  return(
    <div className={isMainPage ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}>
      {offer.filter((i)=>i.city.name === city).map((offerItem) => (
        <MainPageCard
          key={offerItem.id}
          offer={offerItem}
          onListItemHover={onListItemHover}
          isMainPage={isMainPage}
          favouriteList={favouriteList}
        />
      ))}
    </div>
  );
}
export default (OfferList);
