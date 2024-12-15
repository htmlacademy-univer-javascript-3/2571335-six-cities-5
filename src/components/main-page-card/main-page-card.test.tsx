import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OfferDescription } from '../../types/offer-description';
import MainPageCard from './main-page-card.tsx';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';
import { AuthorizationStatus } from '../../mocks/login.ts';
import { datatype } from 'faker';


describe('MainPageCard Component', () => {
  const mockOffer: OfferDescription = {
    id: '1',
    title: 'Beautiful place',
    type: 'Apartment',
    price: 120,
    isPremium: true,
    isFavorite: false,
    rating: 4.5,
    previewImage: '/image.jpg',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12,
    },
    city: {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 12,
      },
    },
  };

  const mockOnListItemHover = vi.fn();
  const mockOnFavouriteClick = vi.fn();

  it('renders correctly', () => {

    const {withStoreComponent} = withStore(
      <MainPageCard
        offer={mockOffer}
        onListItemHover={mockOnListItemHover}
        isMainPage
        onFavouriteClick={mockOnFavouriteClick}
      />);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('mainpagecard-test')).toBeInTheDocument();
    expect(screen.getByText('Beautiful place')).toBeInTheDocument();
    expect(screen.getByText(/€120/)).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('calls onListItemHover callback on mouse enter', () => {
    const {withStoreComponent} = withStore(
      <MainPageCard
        offer={mockOffer}
        onListItemHover={mockOnListItemHover}
        isMainPage
        onFavouriteClick={mockOnFavouriteClick}
      />);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const card = screen.getByTestId('mainpagecard-test');
    fireEvent.mouseEnter(card);

    expect(mockOnListItemHover).toHaveBeenCalledTimes(1);
  });

  it('calls onFavouriteClick callback on favorite button click', () => {
    const {withStoreComponent} = withStore(
      <MainPageCard
        offer={mockOffer}
        onListItemHover={mockOnListItemHover}
        isMainPage
        onFavouriteClick={mockOnFavouriteClick}
      />,
      makeFakeStore({
        User: {
          authorizationStatus: AuthorizationStatus.Auth,
          isUserDataLoading: false,
          userEmail: datatype.string(),
        },
      }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const favButton = screen.getByTestId('favourite-button');
    fireEvent.click(favButton);

    expect(mockOnFavouriteClick).toHaveBeenCalled();
  });
});
