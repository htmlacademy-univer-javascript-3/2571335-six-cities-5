
import {State} from './index.ts';
import { AuthorizationStatus } from '../mocks/login';
import { NAMESPACE } from '../mocks/sliceHeaders';
import { OfferDescription, OfferIdDescription } from '../types/offerDescription.ts';
import { CommentList } from '../types/comment.ts';

export const getCity = (state : Pick<State, NAMESPACE.CITY>) : string => state[NAMESPACE.CITY].city;

export const getAuthorizationStatus = (state: Pick<State, NAMESPACE.USER>): AuthorizationStatus => state[NAMESPACE.USER].authorizationStatus;
const userDataIsLoading = (state : Pick<State,NAMESPACE.USER>) : boolean => state[NAMESPACE.USER].isUserDataLoading;
export const getUserEmail = (state : Pick<State, NAMESPACE.USER>) : string => state[NAMESPACE.USER].userEmail;

export const getOfferList = (state : Pick<State, NAMESPACE.DATA>) : OfferDescription[] => state[NAMESPACE.DATA].offerlist;
export const getComments = (state : Pick<State, NAMESPACE.DATA>) : CommentList => state[NAMESPACE.DATA].comments;
export const getOffer = (state : Pick<State, NAMESPACE.DATA>) : OfferIdDescription => state[NAMESPACE.DATA].offer;
export const offerIsLoadingStatus = (state : Pick<State, NAMESPACE.DATA>) : boolean => state[NAMESPACE.DATA].isOffersLoading;
export const getOffersNearby = (state : Pick<State, NAMESPACE.DATA>) : OfferDescription[] => state[NAMESPACE.DATA].nearbyOffers;
export const getFavourites = (state: Pick<State, NAMESPACE.DATA>) : OfferDescription[] => state[NAMESPACE.DATA].favouriteList;
export const isLoading = offerIsLoadingStatus || userDataIsLoading;
