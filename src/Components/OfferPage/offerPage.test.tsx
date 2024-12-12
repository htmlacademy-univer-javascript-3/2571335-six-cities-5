import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import OfferPage from './OfferPage';
import { withHistory, withStore } from '../../utils/mockComponent';
import { makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../mocks/login';
import { OfferDescription, OfferIdDescription } from '../../types/offerDescription.ts';
import { datatype } from 'faker';
import userEvent from '@testing-library/user-event';

import * as ReactRouterDom from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
  };
});

const mockHandleChange = vi.fn();

describe('Component: OfferPage', () => {
  it('should render "OfferPage" when valid id is provided', () => {
    const mockOfferListOfferPage: OfferDescription[] = [
      {
        id: '1',
        title: datatype.string(),
        type: datatype.string(),
        price: datatype.number(),
        city: {
          name: 'Paris',
          location: {
            latitude: datatype.number(),
            longitude: datatype.number(),
            zoom: datatype.number(),
          }
        },
        location: {
          latitude: datatype.number(),
          longitude: datatype.number(),
          zoom: datatype.number(),
        },
        isFavorite: datatype.boolean(),
        isPremium: datatype.boolean(),
        rating: datatype.number(),
        previewImage: datatype.string(),
      }
    ];
    const mockOfferOfferPage: OfferIdDescription = {
      id: '1',
      title: datatype.string(),
      type: datatype.string(),
      price: datatype.number(),
      city: {
        name: 'Paris',
        location: {
          latitude: datatype.number(),
          longitude: datatype.number(),
          zoom: datatype.number(),
        }
      },
      location: {
        latitude: datatype.number(),
        longitude: datatype.number(),
        zoom: datatype.number(),
      },
      isFavorite: datatype.boolean(),
      isPremium: datatype.boolean(),
      rating: datatype.number(),
      description: datatype.string(),
      bedrooms: datatype.number(),
      goods: [(datatype.string())],
      host: {
        name: datatype.string(),
        avatarUrl: datatype.string(),
        isPro: datatype.boolean(),
      },
      images: [(datatype.string())],
      maxAdults: datatype.number(),
    };

    const { withStoreComponent } = withStore(
      <OfferPage offer={mockOfferOfferPage} offerList={mockOfferListOfferPage} city="Paris" onFavouriteClick={mockHandleChange}/>,
      makeFakeStore({
        Data: {
          offerlist: mockOfferListOfferPage,
          offer: mockOfferOfferPage,
          isOffersLoading: false,
          nearbyOffers: [],
          comments: [],
          favouriteList: [],
        },
        User: {
          authorizationStatus: AuthorizationStatus.Auth,
          isUserDataLoading: false,
          userEmail: datatype.string(),
        },
      })
    );

    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByTestId('user-info')).toBeInTheDocument();
    expect(screen.getByTestId('offer-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('offer-info')).toBeInTheDocument();
    expect(screen.getByTestId('host-info')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
    expect(screen.getByTestId('review-form')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('nearby-places')).toBeInTheDocument();

  });

  it('should render "OfferPage" and dispatch event when press the button', async () => {
    const mockOfferListOfferPage: OfferDescription[] = [
      {
        id: '1',
        title: datatype.string(),
        type: datatype.string(),
        price: datatype.number(),
        city: {
          name: 'Paris',
          location: {
            latitude: datatype.number(),
            longitude: datatype.number(),
            zoom: datatype.number(),
          }
        },
        location: {
          latitude: datatype.number(),
          longitude: datatype.number(),
          zoom: datatype.number(),
        },
        isFavorite: datatype.boolean(),
        isPremium: datatype.boolean(),
        rating: datatype.number(),
        previewImage: datatype.string(),
      }
    ];
    const mockOfferOfferPage: OfferIdDescription = {
      id: '1',
      title: datatype.string(),
      type: datatype.string(),
      price: datatype.number(),
      city: {
        name: 'Paris',
        location: {
          latitude: datatype.number(),
          longitude: datatype.number(),
          zoom: datatype.number(),
        }
      },
      location: {
        latitude: datatype.number(),
        longitude: datatype.number(),
        zoom: datatype.number(),
      },
      isFavorite: datatype.boolean(),
      isPremium: datatype.boolean(),
      rating: datatype.number(),
      description: datatype.string(),
      bedrooms: datatype.number(),
      goods: [(datatype.string())],
      host: {
        name: datatype.string(),
        avatarUrl: datatype.string(),
        isPro: datatype.boolean(),
      },
      images: [(datatype.string())],
      maxAdults: datatype.number(),
    };

    const { withStoreComponent } = withStore(
      <OfferPage offer={mockOfferOfferPage} offerList={mockOfferListOfferPage} city="Paris" onFavouriteClick={mockHandleChange}/>,
      makeFakeStore({
        Data: {
          offerlist: mockOfferListOfferPage,
          offer: mockOfferOfferPage,
          isOffersLoading: false,
          nearbyOffers: [],
          comments: [],
          favouriteList: [],
        },
        User: {
          authorizationStatus: AuthorizationStatus.Auth,
          isUserDataLoading: false,
          userEmail: datatype.string(),
        },
      })
    );

    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    const button = screen.getByTestId('favourite-button');
    await userEvent.click(button);
    expect(button).not.toBeDisabled();
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('should render "NotFound page" when invalid id is provided', () => {
    const mockOfferListOfferPage: OfferDescription[] = [
      {
        id: '2',
        title: datatype.string(),
        type: datatype.string(),
        price: datatype.number(),
        city: {
          name: 'Paris',
          location: {
            latitude: datatype.number(),
            longitude: datatype.number(),
            zoom: datatype.number(),
          }
        },
        location: {
          latitude: datatype.number(),
          longitude: datatype.number(),
          zoom: datatype.number(),
        },
        isFavorite: datatype.boolean(),
        isPremium: datatype.boolean(),
        rating: datatype.number(),
        previewImage: datatype.string(),
      }
    ];
    const mockOfferOfferPage: OfferIdDescription = {
      id: '2',
      title: datatype.string(),
      type: datatype.string(),
      price: datatype.number(),
      city: {
        name: 'Paris',
        location: {
          latitude: datatype.number(),
          longitude: datatype.number(),
          zoom: datatype.number(),
        }
      },
      location: {
        latitude: datatype.number(),
        longitude: datatype.number(),
        zoom: datatype.number(),
      },
      isFavorite: datatype.boolean(),
      isPremium: datatype.boolean(),
      rating: datatype.number(),
      description: datatype.string(),
      bedrooms: datatype.number(),
      goods: [(datatype.string())],
      host: {
        name: datatype.string(),
        avatarUrl: datatype.string(),
        isPro: datatype.boolean(),
      },
      images: [(datatype.string())],
      maxAdults: datatype.number(),
    };

    const { withStoreComponent } = withStore(
      <OfferPage offer={mockOfferOfferPage} offerList={mockOfferListOfferPage} city="Paris" onFavouriteClick={mockHandleChange}/>,
      makeFakeStore({
        Data: {
          offerlist: mockOfferListOfferPage,
          offer: mockOfferOfferPage,
          isOffersLoading: false,
          nearbyOffers: [],
          comments: [],
          favouriteList: [],
        },
        User: {
          authorizationStatus: AuthorizationStatus.Auth,
          isUserDataLoading: false,
          userEmail: datatype.string(),
        },
      })
    );

    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByText('Error 404. Page not found.')).toBeInTheDocument();


  });
});
