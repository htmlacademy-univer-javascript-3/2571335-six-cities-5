import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';

import FavouriteList from './favourite-list.tsx';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { mockOfferList } from '../../mocks/store-mock.ts';

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
