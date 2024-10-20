import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from './Const.js';
import MainPage from './MainPage.tsx';
import {mainPageTypes} from '../../src/index.tsx';
import NotFoundPage from './NotFoundPage.tsx';
import OfferPage from './OfferPage.tsx';
import FavouritePage from './FavouritePage.tsx';
import LoginPage from './LoginPage.tsx';
import PrivateRoute from './PrivateRoute.tsx';
import { OfferDescription } from '../../src/types/offerDescription.ts';
import { review } from '../../src/types/review.ts';

function App({ MainPageCardProps, guestReview, offer } : { MainPageCardProps: mainPageTypes; guestReview: review[]; offer: OfferDescription[] }): JSX.Element {
    return(
        <BrowserRouter>
            <Routes>
                <Route
                    path = {AppRoute.Main}
                    element = {<MainPage MainPageCardProps={MainPageCardProps} offer={offer}/>
                }
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
                            offers = {offer}
                            />
                        </PrivateRoute>
                }
                />
                <Route
                    path = {AppRoute.Offer}
                    element = {<OfferPage offer={offer} guestReview={guestReview}/>}
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