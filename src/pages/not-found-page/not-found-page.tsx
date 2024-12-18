import {Link} from 'react-router-dom';
import React from 'react';

import UserHeaderInfo from '../../components/user-info-header/user-info-header.tsx';
import { AuthorizationStatus } from '../../mocks/login.ts';
import CityList from '../../components/city-list/city-list.tsx';

function NotFoundPage({userEmail, authStatus}:{userEmail:string; authStatus:AuthorizationStatus}):JSX.Element{
  return(
    <div className="page page--gray page--main">
      <UserHeaderInfo userEmail={userEmail} authStatus={authStatus}/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList/>
          </section>
          <h2 style={{ textAlign : 'center'}}>Error 404. Page not found. <Link to = "/"> Back to main page</Link></h2>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </main>
    </div>
  );
}
export default React.memo(NotFoundPage);
