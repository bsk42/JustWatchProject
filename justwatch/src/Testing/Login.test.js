/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom/extend-expect';
 import '@testing-library/jest-dom';
 import Login from '../Screens/Login';
 import userEvent from '@testing-library/user-event'
 import NavBar from '../Components/NavBarComponent';


 test('Login', () => {
    render(<Login />);
    const linkElement = screen.getByText(/Login/i);
  	expect(linkElement).toBeInTheDocument();
})

  test('username', () => {
    render(<Login />);
    const linkElement = screen.getByText(/Username/i);
  	expect(linkElement).toBeInTheDocument();
})

   test('password', () => {
    render(<Login />);
    const linkElement = screen.getByText(/Password/i);
  	expect(linkElement).toBeInTheDocument();
  	expect(screen.getByText(/Password/i)).toBeVisible();
})

test('input fields should be filled correctly', () => {
	render(<Login />);

  const loginTextBox = screen.getByRole("textbox", {
    name: /Username/i,
  });


  userEvent.type(loginTextBox, "kush1234");

  const linkElement = screen.getAllByRole("textbox");


  userEvent.type(linkElement[1], "kush1234");

});


