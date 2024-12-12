import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import OfferList from './OfferList';
import { OfferDescription } from '../../types/offerDescription';
import { datatype } from 'faker';
import { withHistory, withStore } from '../../utils/mockComponent';


describe('OfferList Component', () => {

  const mockOnListItemHover = vi.fn();
  const mockOfferList : OfferDescription[] = [{
    id: datatype.string(),
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
    isFavorite: true,
    isPremium: datatype.boolean(),
    rating: datatype.number(),
    previewImage: datatype.string(),
  }];
  it('renders offers correctly', () => {

    const {withStoreComponent} = withStore(
      <OfferList
        onListItemHover={mockOnListItemHover}
        offer={mockOfferList}
        isMainPage={false}
        city="Paris"
      />);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const list = screen.getByTestId('offerlist-test');
    expect(list).toBeInTheDocument();

  });

  it('calls onListItemHover when hovering over an item', () => {
    const {withStoreComponent} = withStore(
      <OfferList
        onListItemHover={mockOnListItemHover}
        offer={mockOfferList}
        isMainPage
        city="Paris"
      />);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const offerItems = screen.getAllByTestId('mainpagecard-test');
    expect(offerItems.length).toBe(1);
    fireEvent.mouseOver(offerItems[0]);

    expect(mockOnListItemHover).toHaveBeenCalled();
  });
});
