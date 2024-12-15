import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';

import NotFoundPage from './not-found-page.tsx';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { AuthorizationStatus } from '../../mocks/login.ts';

describe('Component: NotFoundPage', () => {

  it('should render "NotFoundPage" ', () => {
    const fakeUserEmail = datatype.string();
    const authStatus = AuthorizationStatus.Auth;
    const {withStoreComponent} = withStore(<NotFoundPage userEmail={fakeUserEmail} authStatus={authStatus}/>);
    const preparedComponent = withHistory(withStoreComponent);
    const expectedText = 'Error 404. Page not found.';

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
