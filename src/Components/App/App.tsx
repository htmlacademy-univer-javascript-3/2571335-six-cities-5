import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../mocks/login';
import MainPage from '../MainPage/MainPage.tsx';
import NotFoundPage from '../NotFoundPage/NotFoundPage.tsx';
import OfferPage from '../OfferPage/OfferPage.tsx';
import FavouritePage from '../FavouritePage/FavouritePage.tsx';
import LoginPage from '../LoginPage/LoginPage.tsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.tsx';
import { review } from '../../types/review.ts';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../LoadingPage/LoadingPage.tsx';


function App({ guestReview } : { guestReview: review[]}): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const offerlist = useAppSelector((state) => state.offerlist);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);
  const offer = useAppSelector((state) => state.offer);

  if (isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<MainPage offerList={offerlist}/>}
        />
        <Route
          path = {AppRoute.Login}
          element = {<LoginPage/>}
        />
        <Route
          path = {AppRoute.Favourites}
          element = {
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavouritePage
                offers = {offerlist}
              />
            </PrivateRoute>
          }
        />
        <Route
          path = {AppRoute.Offer}
          element = {<OfferPage offer = {offer} offerList={offerlist} guestReview={guestReview} city={city}/>}
        />
        <Route
          path = '*'
          element = {<NotFoundPage/>}
        />

      </Routes>
    </BrowserRouter>
  );

}
export default App;
