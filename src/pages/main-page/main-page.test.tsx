import { render, screen } from '@testing-library/react';

import MainPage from './main-page.tsx';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { mockOfferList } from '../../mocks/store-mock.ts';

describe('Component: MainPage', () => {
  it('should render correctly', () => {
    const expectedTestId = 'citylist';
    const formTestId = 'filter-form';
    const {withStoreComponent} = withStore(<MainPage offerList={mockOfferList}/>);
    const preparedComponent = withHistory(withStoreComponent);
    const expectedText = /places to stay in/i;
    const expectedHeader = /Cities/i;

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);
    const text = screen.getByText(expectedText);
    const header = screen.getByText(expectedHeader);
    const form = screen.getByTestId(formTestId);

    expect(testId).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
