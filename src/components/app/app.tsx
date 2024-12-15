import { Route, Routes} from 'react-router-dom';
import { useMemo } from 'react';

import {AppRoute, AuthorizationStatus} from '../../mocks/login.ts';
import MainPage from '../../pages/main-page/main-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import FavouritePage from '../../pages/favourite-page/favourite-page.tsx';
import LoginPage from '../../pages/login-page/login-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {useAppSelector} from '../../hooks/index.ts';
import LoadingPage from '../../pages/loading-page/loading-page.tsx';
import { getAuthorizationStatus, getCity, getFavourites, getOffer, getOfferList, getUserEmail, isLoading } from '../../store/selectors.ts';
import MainEmpty from '../../pages/main-empty/main-empty.tsx';
import FavouritePageEmpty from '../../pages/favourite-page-empty/favourite-page-empty.tsx';
import {useAppDispatch} from '../../hooks/index.ts';
import { loginAction, setFavourites } from '../../store/api-actions.ts';
import { changeCityAction } from '../../store/city-process/city-process.ts';
import { CITY } from '../../mocks/city.ts';
import { redirectToRoute } from '../../store/city-action.ts';

function App(): JSX.Element {

  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthorizationStatus);
  const authorizationStatus = useMemo(() => authStatus,[authStatus]);

  const cityName = useAppSelector(getCity);
  const city = useMemo(() => cityName,[cityName]);

  const getList = useAppSelector(getOfferList);
  const offerList = useMemo(() => getList,[getList]);

  const isLoadingStatus = useAppSelector(isLoading);
  const isDataLoading = useMemo(() => isLoadingStatus, [isLoadingStatus]);

  const gotOffer = useAppSelector(getOffer);
  const offer = useMemo(() => gotOffer,[gotOffer]);

  const gotUserEmail = useAppSelector(getUserEmail);
  const userEmail = useMemo(() => gotUserEmail,[gotUserEmail]);

  const favouriteList = useAppSelector(getFavourites);
  const favouriteListMemo = useMemo(() => favouriteList, [favouriteList]);


  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return (
      <LoadingPage />
    );
  }
  const onLoginFormSubmit = (login : string, password:string) => {
    dispatch(loginAction({
      login: login,
      password: password
    }));
  };

  const onRandomCityClick = (cityNumber: number) => {
    dispatch(changeCityAction(CITY[cityNumber].title));
    dispatch(redirectToRoute(AppRoute.Main));
  };

  const onFavouriteClick = (id : string, status : number, isOfferPage : boolean) => {
    const favouriteInfo = {
      offerId:id,
      status: status,
      isOfferPage: isOfferPage
    };
    dispatch(setFavourites(favouriteInfo));
  };
  return(
    <Routes>
      <Route
        path = {AppRoute.Main}
        element={offerList.length > 0 ?
          <MainPage offerList={offerList} /> :
          <MainEmpty authStatus={authorizationStatus} cityName={cityName} userEmail={userEmail} />}
      />
      <Route
        path = {AppRoute.Login}
        element = {authStatus === AuthorizationStatus.Auth ? <MainPage offerList={offerList}/> : <LoginPage onLoginFormSubmit={onLoginFormSubmit} onRandomCityClick={onRandomCityClick}/>}
      />
      <Route
        path = {AppRoute.Favourites}
        element = {
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {favouriteListMemo.length > 0 ? (
              <FavouritePage
                offers = {favouriteListMemo}
                authStatus = {authorizationStatus}
                userEmail = {userEmail}
              />) : (
              <FavouritePageEmpty authStatus={authorizationStatus} userEmail={userEmail}/>)}
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Offer}`}
        element={<OfferPage offer={offer} offerList={offerList} city={city} onFavouriteClick = {onFavouriteClick}/>}
      />
      <Route
        path = '*'
        element = {<NotFoundPage userEmail={userEmail} authStatus={authorizationStatus}/>}
      />

    </Routes>
  );

}
export default App;
