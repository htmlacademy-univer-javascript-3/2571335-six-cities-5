import { render, screen } from '@testing-library/react';
import ReviewList from './review-list.tsx';
import { mockCommentList } from '../../mocks/store-mock.ts';


describe('Component: Loading page', () => {
  it('should render correctly', () => {
    const reviewListTestId = 'reviews-list';
    const expectedText = /Reviews/i;

    render(<ReviewList guestReview={mockCommentList}/>);

    const reviewList = screen.getByTestId(reviewListTestId);

    expect(reviewList).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();

  });
});
