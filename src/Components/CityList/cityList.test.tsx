import CityList from './CityList.tsx';
import { withHistory, withStore } from '../../utils/mockComponent.tsx';
import { render, screen } from '@testing-library/react';

describe('Component: CityList', () => {
  it('should render correctly', () => {
    const expectedTestId = 'cityList';
    const {withStoreComponent} = withStore(<CityList />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);

    expect(testId).toBeInTheDocument();
  });
});
