import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../mocks/login';
import MainPage from '../MainPage/MainPage.tsx';
import NotFoundPage from '../NotFoundPage/NotFoundPage.tsx';
import OfferPage from '../OfferPage/OfferPage.tsx';
import FavouritePage from '../FavouritePage/FavouritePage.tsx';
import LoginPage from '../LoginPage/LoginPage.tsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.tsx';
import {useAppSelector} from '../../hooks';
import LoadingPage from '../LoadingPage/LoadingPage.tsx';
import { useMemo } from 'react';
import { getAuthorizationStatus, getCity, getFavourites, getOffer, getOfferList, getUserEmail, isLoading } from '../../store/selectors.ts';
import MainEmpty from '../MainEmpty/MainEmpty.tsx';
import FavouritePageEmpty from '../FavouritePageEmpty/FavouritePageEmpty.tsx';
import {useAppDispatch} from '../../hooks';
import { loginAction, setFavourites } from '../../store/apiActions.ts';

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
        element = {authStatus === AuthorizationStatus.Auth ? <MainPage offerList={offerList}/> : <LoginPage onLoginFormSubmit={onLoginFormSubmit}/>}
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
