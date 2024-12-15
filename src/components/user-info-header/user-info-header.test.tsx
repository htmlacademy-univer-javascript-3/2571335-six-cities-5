import { datatype } from 'faker';
import { render, screen } from '@testing-library/react';

import UserInfoHeader from './user-info-header.tsx';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { AuthorizationStatus } from '../../mocks/login.ts';

describe('Component: FavouriteListCard', () => {
  it('should render correctly when user signed in', () => {
    const expectedTestId = 'user-info';
    const expectedAuthItemTestId = 'item-for-auth';
    const expectedText = /Sign out/i;
    const userEmailTest = datatype.string();
    const {withStoreComponent} = withStore(<UserInfoHeader authStatus = {AuthorizationStatus.Auth} userEmail={userEmailTest}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);
    const authItem = screen.getByTestId(expectedAuthItemTestId);

    expect(testId).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(authItem).toBeInTheDocument();
  });
  it('should render correctly when user signed out', () => {
    const expectedTestId = 'user-info';
    const expectedText = /Sign in/i;
    const userEmailTest = datatype.string();
    const {withStoreComponent} = withStore(<UserInfoHeader authStatus = {AuthorizationStatus.NoAuth} userEmail={userEmailTest}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);

    expect(testId).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
