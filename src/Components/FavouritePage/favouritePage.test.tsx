import FavouritePage from './FavouritePage.tsx';
import { withHistory, withStore } from '../../utils/mockComponent.tsx';
import { render, screen } from '@testing-library/react';
import { mockOfferList } from '../../mocks/storeMock.ts';
import { datatype } from 'faker';
import { AuthorizationStatus } from '../../mocks/login.ts';

describe('Component: FavouritePage', () => {
  it('should render correctly', () => {
    const expectedTestId = 'saved-list';
    const expectedFooterTestId = 'favourite-page-footer';
    const userEmail = datatype.string();
    const {withStoreComponent} = withStore(<FavouritePage offers = {mockOfferList} authStatus={AuthorizationStatus.Auth} userEmail={userEmail} />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);
    const footerTestId = screen.getByTestId(expectedFooterTestId);

    expect(testId).toBeInTheDocument();
    expect(footerTestId).toBeInTheDocument();
    expect(screen.getByText(userEmail)).toBeInTheDocument();
  });
});
