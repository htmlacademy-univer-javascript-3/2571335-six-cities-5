import { useState } from "react";
import { OfferDescription } from "../types/offerDescription";
import { store } from "../store";
import { setFavourites } from "../store/apiActions";
import { useAppSelector } from ".";
import { getFavourites } from "../store/selectors";

export const useFavourites = (event: MouseEvent, offer: OfferDescription) => {
    const favouriteList = useAppSelector(getFavourites);
    const [isFavorite, setFavourite] = useState<boolean>(favouriteList.length > 0 ? (favouriteList.filter((favotrite) => favotrite.id === offer.id)).length > 0 : false);
    const handleFavouriteClick = () => {
        event.preventDefault();
        setFavourite(!isFavorite);
        const favouriteInfo = {
          offerId:offer.id,
          status: isFavorite ? 0 : 1
        }
        store.dispatch(setFavourites(favouriteInfo));
      }
    return[ handleFavouriteClick, isFavorite]
}