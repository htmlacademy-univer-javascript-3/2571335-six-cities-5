import userEvent from '@testing-library/user-event';
import FavouriteListCard from './FavouriteListCard.tsx';
import { withHistory, withStore } from '../../utils/mockComponent.tsx';
import { render, screen } from '@testing-library/react';
import { mockOfferList } from '../../mocks/storeMock.ts';

describe('Component: FavouriteListCard', () => {
  const mockHandleChange = vi.fn();
  it('should render correctly', () => {
    const expectedTestId = 'cardInfo';
    const {withStoreComponent} = withStore(<FavouriteListCard offer = {mockOfferList[0]} handleFavouriteStatusChange={mockHandleChange}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);

    expect(testId).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

  });
  it('should call handleFavouriteStatusChange when press button', async () => {
    const {withStoreComponent} = withStore(<FavouriteListCard offer = {mockOfferList[0]} handleFavouriteStatusChange={mockHandleChange}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
