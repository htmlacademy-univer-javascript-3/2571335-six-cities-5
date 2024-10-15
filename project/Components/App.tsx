import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from './Const.js';
import MainPage from './MainPage.tsx';
import {mainPageTypes} from '../../src/index.tsx';
import NotFoundPage from './NotFoundPage.tsx';
import OfferPage from './OfferPage.tsx';
import FavouritePage from './FavouritePage.tsx';
import LoginPage from './LoginPage.tsx';
import PrivateRoute from './PrivateRoute.tsx';


function App({ MainPageCardProps }: { MainPageCardProps: mainPageTypes[] }): JSX.Element {

    return(
        <BrowserRouter>
            <Routes>
                <Route
                    path = {AppRoute.Main}
                    element = {<MainPage MainPageCardProps={MainPageCardProps}/>}
                />
                <Route
                    path = {AppRoute.Login}
                    element = {<LoginPage/>}
                />
                <Route
                    path = {AppRoute.Favourites}
                    element = {
                        <PrivateRoute
                            authorizationStatus={AuthorizationStatus.NoAuth}
                        >
                            <FavouritePage/>
                        </PrivateRoute>
                }
                />
                <Route
                    path = {AppRoute.Offer}
                    element = {<OfferPage/>}
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