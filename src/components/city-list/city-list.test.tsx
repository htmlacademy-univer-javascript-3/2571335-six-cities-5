import { render, screen } from '@testing-library/react';
import CityList from './city-list.tsx';
import { withHistory, withStore } from '../../utils/mock-component.tsx';

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
