import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';

import MainEmpty from './main-empty.tsx';
import { AuthorizationStatus } from '../../mocks/login.ts';
import { withHistory, withStore } from '../../utils/mock-component.tsx';


describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    const expectedText = /No places to stay available/i;
    const testCityName = datatype.string();
    const testEmail = datatype.string();
    const userTestId = 'user-info';
    const cityListTestId = 'citylist';

    const {withStoreComponent} = withStore(<MainEmpty authStatus={AuthorizationStatus.Auth} userEmail = {testEmail} cityName = {testCityName}/>);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const user = screen.getByTestId(userTestId);
    const cityList = screen.getByTestId(cityListTestId);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(testEmail)).toBeInTheDocument();
    expect(user).toBeInTheDocument();
    expect(cityList).toBeInTheDocument();
  });
});
