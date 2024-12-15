import { withHistory, withStore } from '../../utils/mockComponent.tsx';
import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { AuthorizationStatus } from '../../mocks/login.ts';
import FavouritePageEmpty from './FavouritePageEmpty.tsx';

describe('Component: FavouritePageEmpty', () => {
  it('should render correctly', () => {
    const expectedTestId = 'empty-favourite-page-footer';
    const expectedText = /Nothing yet saved./i;
    const userEmailMock = datatype.string();
    const {withStoreComponent} = withStore(<FavouritePageEmpty authStatus={AuthorizationStatus.Auth} userEmail={userEmailMock} />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const testId = screen.getByTestId(expectedTestId);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(testId).toBeInTheDocument();
  });
});
