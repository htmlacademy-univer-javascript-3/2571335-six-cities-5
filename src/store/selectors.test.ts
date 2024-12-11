import { AuthorizationStatus } from '../mocks/login.ts';
import { CityProcess, DataProcess, UserProcess } from '../types/state.ts';
import { NAMESPACE } from '../mocks/sliceHeaders';
import { getAuthorizationStatus, getCity, getComments, getFavourites, getOffer, getOfferList, getOffersNearby, getUserEmail, isLoading, offerIsLoadingStatus} from './selectors';
import { datatype } from 'faker';
import { dataProcessInitialStateMock, mockCommentList, mockOffer, mockOfferList, mockUser } from '../mocks/storeMock.ts';

describe('UserProcess selectors', () => {
  it('should return authorization status, email from state', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const email = datatype.string();
    const state: UserProcess = {
      authorizationStatus : authorizationStatus,
      userEmail : email,
      isUserDataLoading : true
    };

    const resultAuth = getAuthorizationStatus({ [NAMESPACE.USER]: state });
    const resultEmail = getUserEmail({[NAMESPACE.USER]: state});

    expect(resultAuth).toBe(authorizationStatus);
    expect(resultEmail).toBe(email);
  });
});

describe('DataProcess selectors', () => {
  it('should return offerList from state', () => {

    const offerList = mockOfferList
    const offer = mockOffer;
    const isOffersLoading = true;
    const nearbyOffers = mockOfferList;
    const commentList = mockCommentList;
    const favouriteList = mockOfferList

    const state: DataProcess = {
      offerlist: offerList,
      isOffersLoading: isOffersLoading,
      offer: offer,
      nearbyOffers: nearbyOffers,
      comments: commentList,
      favouriteList: favouriteList
    };

    const resultOfferList = getOfferList({ [NAMESPACE.DATA]: state });

    expect(resultOfferList).toBe(offerList);
  });

  it('should return offer from state', () => {

    const offerList = mockOfferList
    const offer = mockOffer;
    const isOffersLoading = true;
    const nearbyOffers = mockOfferList;
    const commentList = mockCommentList;
    const favouriteList = mockOfferList

    const state: DataProcess = {
      offerlist: offerList,
      isOffersLoading: isOffersLoading,
      offer: offer,
      nearbyOffers: nearbyOffers,
      comments: commentList,
      favouriteList: favouriteList
    };

    const resultOffer = getOffer({ [NAMESPACE.DATA]: state });

    expect(resultOffer).toBe(offer);
  });

  it('should return isOffersLoading from state', () => {

    const offerList = mockOfferList
    const offer = mockOffer;
    const isOffersLoading = true;
    const nearbyOffers = mockOfferList;
    const commentList = mockCommentList;
    const favouriteList = mockOfferList

    const state: DataProcess = {
      offerlist: offerList,
      isOffersLoading: isOffersLoading,
      offer: offer,
      nearbyOffers: nearbyOffers,
      comments: commentList,
      favouriteList: favouriteList
    };

    const resultIsOffersLoading = offerIsLoadingStatus({ [NAMESPACE.DATA]: state });

    expect(resultIsOffersLoading).toBe(isOffersLoading);
  });

  it('should return nearbyOffers from state', () => {

    const offerList = mockOfferList
    const offer = mockOffer;
    const isOffersLoading = true;
    const nearbyOffers = mockOfferList;
    const commentList = mockCommentList;
    const favouriteList = mockOfferList

    const state: DataProcess = {
      offerlist: offerList,
      isOffersLoading: isOffersLoading,
      offer: offer,
      nearbyOffers: nearbyOffers,
      comments: commentList,
      favouriteList: favouriteList
    };

    const resultNearbyOffers = getOffersNearby({ [NAMESPACE.DATA]: state });

    expect(resultNearbyOffers).toBe(nearbyOffers);
  });

  it('should return comments from state', () => {

    const offerList = mockOfferList
    const offer = mockOffer;
    const isOffersLoading = true;
    const nearbyOffers = mockOfferList;
    const commentList = mockCommentList;
    const favouriteList = mockOfferList

    const state: DataProcess = {
      offerlist: offerList,
      isOffersLoading: isOffersLoading,
      offer: offer,
      nearbyOffers: nearbyOffers,
      comments: commentList,
      favouriteList: favouriteList
    };

    const resultCommentList = getComments({ [NAMESPACE.DATA]: state });

    expect(resultCommentList).toBe(commentList);
  });

  it('should return favouriteList from state', () => {

    const offerList = mockOfferList
    const offer = mockOffer;
    const isOffersLoading = true;
    const nearbyOffers = mockOfferList;
    const commentList = mockCommentList;
    const favouriteList = mockOfferList

    const state: DataProcess = {
      offerlist: offerList,
      isOffersLoading: isOffersLoading,
      offer: offer,
      nearbyOffers: nearbyOffers,
      comments: commentList,
      favouriteList: favouriteList
    };

    const resultfavouriteList = getFavourites({ [NAMESPACE.DATA]: state });

    expect(resultfavouriteList).toBe(favouriteList);
  });

});

describe('CityProcess selectors', () => {
  it('should return city from state', () => {
    const state: CityProcess = {
      city: 'Paris'
    };

    const resultCity = getCity({ [NAMESPACE.CITY]: state });

    expect(resultCity).toBe('Paris');
  });
});

describe('UserProcess and DataProcess selector is Loading', () => {
  it('should return isLoading', () => {
    const state = {
      User: mockUser,
      Data: dataProcessInitialStateMock,
      City:{city: 'Paris'}
    };

    const resultIsLoadingStatus = isLoading(state);

    expect(resultIsLoadingStatus).toBe(false);
  });
});

