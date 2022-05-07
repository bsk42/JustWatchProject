/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom/extend-expect';
 import '@testing-library/jest-dom';
 import InitialScreen from '../Screens/InitialScreen';
 import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event'


 test('Login', () => {
    render(
    	<Router>
    		<InitialScreen />
    	</Router>
    	);
    const linkElement = screen.getByText(/LOGIN/i);
  	expect(linkElement).toBeInTheDocument();
})

  test('register', () => {
    render(
    	<Router>
    		<InitialScreen />
    	</Router>
    	);
    const linkElement = screen.getByText(/REGISTER/i);
  	expect(linkElement).toBeInTheDocument();
})
    test('register', () => {
    render(
    	<Router>
    		<InitialScreen />
    	</Router>
    	);
      userEvent.click(screen.getByText("LOGIN"));
  
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
})

    test('register', () => {
    render(
    	<Router>
    		<InitialScreen />
    	</Router>
    	);
  const loginBttn = screen.getByRole("button", {
    name: /REGISTER/i,
  });
  userEvent.click(loginBttn);
})

