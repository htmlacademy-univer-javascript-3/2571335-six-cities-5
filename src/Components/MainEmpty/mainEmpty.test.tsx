import { render, screen } from '@testing-library/react';
import MainEmpty from './MainEmpty.tsx';
import { AuthorizationStatus } from '../../mocks/login.ts';
import { datatype } from 'faker';
import { withHistory, withStore } from '../../utils/mockComponent.tsx';


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
