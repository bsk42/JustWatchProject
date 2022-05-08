/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom/extend-expect';
 import '@testing-library/jest-dom';
 import Register from '../Screens/Register';
 import userEvent from '@testing-library/user-event'


 test('Register', () => {
    render(<Register />);
    const linkElement = screen.getByText(/Register/i);
  	expect(linkElement).toBeInTheDocument();
})

  test('username', () => {
    render(<Register />);
    const linkElement = screen.getByText(/Username/i);
  	expect(linkElement).toBeInTheDocument();
})

   test('password', () => {
    render(<Register />);
    const linkElement = screen.getByText(/Password/i);
  	expect(linkElement).toBeInTheDocument();
})

   test('email', () => {
    render(<Register />);
    const linkElement = screen.getByText(/Email/i);
    expect(linkElement).toBeInTheDocument();
})

// test('input fields should be filled correctly', () => {
//   render(<Register />);

//   const usernameTextBox = screen.getByRole("textbox", {
//     name: /Username/i,
//   });
//   userEvent.type(usernameTextBox, "kush1234");

//   const emailTextBox = screen.getByRole("textbox", {
//     name: /Email/i,
//   });
//   userEvent.type(emailTextBox, "kp@justwatch.com");

//   const linkElement = screen.getAllByRole("textbox");

//   userEvent.type(linkElement[0], "Kush P");
//   userEvent.type(linkElement[3], "Kush1234");

// });