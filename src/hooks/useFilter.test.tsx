import { render, screen } from '@testing-library/react';
import {useFilter} from './useFilter.ts';
import { OfferDescription } from '../types/offerDescription.ts';
import { datatype } from 'faker';

const TestComponent = ({offerList}:{offerList:OfferDescription[]}) => {
  const filteredOfferByLowPrice = useFilter(offerList,'Price: low to high');
  const filteredOfferByHighPrice = useFilter(offerList,'Price: high to low');
  const filteredOfferByRating = useFilter(offerList,'Top rated first');
  const filteredByDefault = useFilter(offerList,'Popular');

  return (
    <div>
      {(filteredOfferByLowPrice[0].price === 1) ? <p>Отрисован объект c наименьшей стоимостью </p> : null}
      {(filteredOfferByHighPrice[0].price === 100) ? <p>Отрисован объект c наибольшей стоимостью </p> : null}
      {(filteredOfferByRating[0].rating === 5) ? <p>Отрисован объект c наибольшим рейтингом </p> : null}
      {(JSON.stringify(filteredByDefault[0]) === JSON.stringify(offerList[0])) ? <p>Отрисован объект переданный первым по умолчанию </p> : null}
    </div>
  );
};

export default TestComponent;

describe('useFilter', () => {
  it('should render component according to filter', () => {
    const expectedTextLowPrice = 'Отрисован объект c наименьшей стоимостью';
    const expectedTextHighPrice = 'Отрисован объект c наибольшей стоимостью';
    const expectedTextHighRating = 'Отрисован объект c наибольшим рейтингом';
    const expectedTextByDefault = 'Отрисован объект переданный первым по умолчанию';

    const offerListTest:OfferDescription[] = [
      {
        id: datatype.string(),
        title: datatype.string(),
        type: datatype.string(),
        price: 100,
        city: {
          name: datatype.string(),
          location: {
            latitude: datatype.number(),
            longitude: datatype.number(),
            zoom: datatype.number(),
          },
        },
        location: {
          latitude: datatype.number(),
          longitude: datatype.number(),
          zoom: datatype.number(),
        },
        isFavorite: datatype.boolean(),
        isPremium: datatype.boolean(),
        rating: 5,
        previewImage: datatype.string(),
      },
      {
        id: datatype.string(),
        title: datatype.string(),
        type: datatype.string(),
        price: 1,
        city: {
          name: datatype.string(),
          location: {
            latitude: datatype.number(),
            longitude: datatype.number(),
            zoom: datatype.number(),
          },
        },
        location: {
          latitude: datatype.number(),
          longitude: datatype.number(),
          zoom: datatype.number(),
        },
        isFavorite: datatype.boolean(),
        isPremium: datatype.boolean(),
        rating: 1,
        previewImage: datatype.string(),
      }
    ];
    render(<TestComponent offerList={offerListTest} />);
    expect(screen.getByText(expectedTextLowPrice)).toBeInTheDocument();
    expect(screen.getByText(expectedTextHighPrice)).toBeInTheDocument();
    expect(screen.getByText(expectedTextHighRating)).toBeInTheDocument();
    expect(screen.getByText(expectedTextByDefault)).toBeInTheDocument();

  });
});
