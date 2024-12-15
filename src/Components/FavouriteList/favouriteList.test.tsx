import FavouriteList from './FavouriteList.tsx';
import { withHistory, withStore } from '../../utils/mockComponent.tsx';
import { render, screen } from '@testing-library/react';
import { mockOfferList } from '../../mocks/storeMock.ts';
import { datatype } from 'faker';

describe('Component: FavouriteList', () => {
  it('should render correctly', () => {
    const expectedTestId = 'favourite-list';
    const cityList = [datatype.string(), datatype.string()];
    const {withStoreComponent} = withStore(<FavouriteList offers = {mockOfferList} cityList={cityList} />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);

    expect(testId).toBeInTheDocument();
  });
});
