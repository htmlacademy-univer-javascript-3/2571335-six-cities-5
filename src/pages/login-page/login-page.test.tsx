import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginPage from './login-page.tsx';
import { withHistory, withStore } from '../../utils/mock-component.tsx';


describe('Component: LoginPage', () => {
  const mockFormSubmit = vi.fn();
  const mockRandomCityClick = vi.fn();
  it('should render correctly', () => {
    const expectedFormTestId = 'login-form';
    const expectedEmailTestId = 'email-input';
    const expectedLoginTestId = 'password-input';
    const {withStoreComponent} = withStore(<LoginPage onLoginFormSubmit={mockFormSubmit} onRandomCityClick={mockRandomCityClick}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const expectedForm = screen.getByTestId(expectedFormTestId);
    const expectedEmail = screen.getByTestId(expectedEmailTestId);
    const expectedLogin = screen.getByTestId(expectedLoginTestId);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(expectedForm).toBeInTheDocument();
    expect(expectedEmail).toBeInTheDocument();
    expect(expectedLogin).toBeInTheDocument();

  });

  it('dont send post request on server if password is invalid', async () => {

    const { withStoreComponent } = withStore(<LoginPage onLoginFormSubmit={mockFormSubmit} onRandomCityClick={mockRandomCityClick}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const emailElement = screen.getByPlaceholderText('Email');
    const passwordElement = screen.getByPlaceholderText('Password');
    const buttonElement = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailElement, 'Oliver.conner@gmail.com');
    await userEvent.type(passwordElement, 'p');

    await userEvent.click(buttonElement);

    expect(mockFormSubmit).not.toHaveBeenCalled();
    expect(mockRandomCityClick).not.toHaveBeenCalled();

  });
  it('should handle button click when password and email are correct', async () => {

    const { withStoreComponent } = withStore(<LoginPage onLoginFormSubmit={mockFormSubmit} onRandomCityClick={mockRandomCityClick}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const emailElement = screen.getByPlaceholderText('Email');
    const passwordElement = screen.getByPlaceholderText('Password');
    const buttonElement = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailElement, 'Oliver.conner@gmail.com');
    await userEvent.type(passwordElement, 'password1');

    expect(emailElement).toHaveValue('Oliver.conner@gmail.com');
    expect(passwordElement).toHaveValue('password1');

    await userEvent.click(buttonElement);

    expect(mockFormSubmit).toHaveBeenCalledWith('Oliver.conner@gmail.com', 'password1');
    expect(mockFormSubmit).toHaveBeenCalledTimes(1);
  });

  it('should handle randomCityClick', async () => {

    const { withStoreComponent } = withStore(<LoginPage onLoginFormSubmit={mockFormSubmit} onRandomCityClick={mockRandomCityClick}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const spanElement = screen.getByTestId('randomCitySpan');
    await userEvent.click(spanElement);

    expect(mockRandomCityClick).toHaveBeenCalledTimes(1);
  });

});
