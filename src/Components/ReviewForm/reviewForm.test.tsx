import userEvent from '@testing-library/user-event';
import ReviewForm from './ReviewForm.tsx';
import { withHistory, withStore } from '../../utils/mockComponent.tsx';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Component: ReviewForm', () => {
  const mockHandleChange = vi.fn();
  it('should render correctly', () => {
    const expectedTestId = 'stars-container';
    const {withStoreComponent} = withStore(<ReviewForm onFormSubmit={mockHandleChange}/>);
    const preparedComponent = withHistory(withStoreComponent);
    const expectedText = /Your review/i;
    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);
    const text = screen.getByText(expectedText);

    expect(testId).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render button with initial disable state', () => {

    const {withStoreComponent} = withStore(<ReviewForm onFormSubmit={mockHandleChange}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should call onFormSubmit when set star, type review and press button. Button should becabe disabled after user click', async () => {
    const {withStoreComponent} = withStore(<ReviewForm onFormSubmit={mockHandleChange}/>);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const reviewElement = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    const ratingElement = screen.getByTitle('perfect');

    fireEvent.click(ratingElement);
    await userEvent.type(reviewElement, 'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!');
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
    expect(mockHandleChange).toHaveBeenCalled();
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });
});
