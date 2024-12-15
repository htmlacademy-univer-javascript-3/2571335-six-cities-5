import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';

import Map from './map.tsx';
import { CITIES } from '../../mocks/city.ts';
import { mockOfferList } from '../../mocks/store-mock.ts';


describe('Map Component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a map container with the correct dimensions', () => {
    render(
      <Map
        city={CITIES[0]}
        height={500}
        width={800}
        offerList={mockOfferList}
        selectedOffer={mockOfferList[0]}
      />
    );

    const mapContainer = screen.getByTestId('map-test');
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveStyle({ height: '500px', width: '800px' });
  });

});
