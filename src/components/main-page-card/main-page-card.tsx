import { Link} from 'react-router-dom';
import { MouseEvent} from 'react';
import React from 'react';

import { fetchComments, fetchOffer, fetchOfferNeibourhood } from '../../store/api-actions.ts';
import { store } from '../../store/index.ts';
import { useAppSelector } from '../../hooks/index.ts';
import { getAuthorizationStatus } from '../../store/selectors.ts';
import { AppRoute, AuthorizationStatus } from '../../mocks/login.ts';
import { OfferDescription } from '../../types/offer-description.ts';


type MainPageCardProps = {
  offer: OfferDescription;
  onListItemHover: (listItemName: string) => void;
  isMainPage:boolean;
  onFavouriteClick: (id:string, status:number, isOfferPage:boolean) => void;
};

function MainPageCard({ offer, onListItemHover, isMainPage, onFavouriteClick}: MainPageCardProps): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const handleListItemHover = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onListItemHover((offer.id));
  };
  const handleListItemLeave = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onListItemHover('0');
  };
  const handleFavouriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const favouriteInfo = {
      offerId:offer.id,
      status: offer.isFavorite ? 0 : 1,
      isOfferPage: !isMainPage
    };
    onFavouriteClick(favouriteInfo.offerId, favouriteInfo.status, favouriteInfo.isOfferPage);
  };
  const handleOfferIdLoad = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    store.dispatch(fetchOffer(offer.id));
    store.dispatch(fetchOfferNeibourhood(offer.id));
    store.dispatch(fetchComments(offer.id));
  };
  return(
    <article className={isMainPage ? 'cities__card place-card' : 'near-places__card place-card'}
      onMouseEnter={handleListItemHover}
      onMouseLeave={handleListItemLeave}
      data-testid = 'mainpagecard-test'
    >
      {offer.isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>) : null}
      <div className={isMainPage ? 'cities__image-wrapper place-card__image-wrapper' : 'near-places__image-wrapper place-card__image-wrapper'}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info" data-testid = 'card-info'>

        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {(authStatus === AuthorizationStatus.Auth) ?
            <button className={offer.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button" onClick={handleFavouriteClick} data-testid = 'favourite-button'>
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks' }</span>
            </button> :
            <button className={'place-card__bookmark-button button'} type="button">
              <Link to = {AppRoute.Login}>
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
              </Link>
              <span className="visually-hidden">To bookmarks</span>
            </button>}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(offer.rating / 5) * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name"
          onClick={handleOfferIdLoad}
        >
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</p>
      </div>
    </article>

  );
}
export default React.memo(MainPageCard);
