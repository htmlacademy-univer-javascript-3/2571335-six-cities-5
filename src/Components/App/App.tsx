import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../mocks/login';
import MainPage from '../MainPage/MainPage.tsx';
import NotFoundPage from '../NotFoundPage/NotFoundPage.tsx';
import OfferPage from '../OfferPage/OfferPage.tsx';
import FavouritePage from '../FavouritePage/FavouritePage.tsx';
import LoginPage from '../LoginPage/LoginPage.tsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.tsx';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../LoadingPage/LoadingPage.tsx';
import HistoryRouter from '../HistoryRouter/HistoryRouter.tsx';
import browserHistory from '../../services/browserHistory.ts';
import { useMemo } from 'react';
function App(): JSX.Element {

  const authorizationStatus_ = useAppSelector((state) => state.User.authorizationStatus);
  const authorizationStatus = useMemo(() => {return authorizationStatus_},[authorizationStatus_]);

  const c = useAppSelector((state) => state.City.city);
  const city = useMemo(() => {return c},[c]);

  const olist = useAppSelector((state) => state.Data.offerlist);
  const offerList = useMemo(() => {return olist},[olist]);

  const isDataL = useAppSelector((state) => state.Data.isOffersLoading);
  const isDataLoading = useMemo(() => {return isDataL}, [isDataL]);

  const off = useAppSelector((state) => state.Data.offer);
  const offer = useMemo(() => {return off},[off]);

  const userE = useAppSelector((state) => state.User.userEmail);
  const userEmail = useMemo(() => {return userE},[userE]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return(
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<MainPage offerList={offerList}/>}
        />
        <Route
          path = {AppRoute.Login}
          element = {<LoginPage/>}
        />
        <Route
          path = {AppRoute.Favourites}
          element = {
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavouritePage
                offers = {offerList}
              />
            </PrivateRoute>
          }
        />
        <Route
          path = {AppRoute.Offer}
          element = {(offerList.filter((o) => o.id === offer.id).length) > 0 ? <OfferPage offer = {offer} offerList={offerList} city={city}/> : <NotFoundPage userEmail={userEmail} authStatus={authorizationStatus}/>}
        />
        <Route
          path = '*'
          element = {<NotFoundPage userEmail={userEmail} authStatus={authorizationStatus}/>}
        />

      </Routes>
    </HistoryRouter>
  );

}
export default App;
