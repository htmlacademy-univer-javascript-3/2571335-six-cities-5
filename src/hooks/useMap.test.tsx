import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import useMap from './useMap.tsx';
import { City } from '../types/points';
import { CITY } from '../mocks/city';

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

    render(<TestComponent {...CITY[0]} />);

    const textElement = screen.queryByText(notExpectedText);
    expect(textElement).not.toBeInTheDocument();
  });
});
