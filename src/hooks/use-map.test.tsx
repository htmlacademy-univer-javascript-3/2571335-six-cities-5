import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import useMap from './use-map.tsx';
import { City } from '../types/points.ts';
import { CITIES } from '../mocks/city.ts';

const TestComponent = (city : City) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  return (
    <div>
      <div ref={mapRef}/>
      {map ? null : <p>Карта не инициализирована</p>}
    </div>
  );
};

export default TestComponent;

describe('useMap', () => {
  it('should render map correctly', () => {
    const notExpectedText = 'Карта не инициализирована';

    render(<TestComponent {...CITIES[0]} />);

    const textElement = screen.queryByText(notExpectedText);
    expect(textElement).not.toBeInTheDocument();
  });
});
