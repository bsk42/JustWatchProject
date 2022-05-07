/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom/extend-expect';
 import '@testing-library/jest-dom';
 import Friends from '../Screens/Friends';
 import userEvent from '@testing-library/user-event'
 import React from 'react';
 import {BrowserRouter as Router} from 'react-router-dom';


 test('Message', () => {
    render(
    	<Router>
    		<Friends />
    	</Router>
    	);
    const linkElement = screen.getAllByText(/Message/i);
  	expect(linkElement[0]).toBeInTheDocument();
  	expect(linkElement[1]).toBeInTheDocument();
  	expect(linkElement[2]).toBeInTheDocument();
})

test('click Message', () => {
    render(<Router>
        <Friends />
      </Router>
      );

  const linkElement = screen.getAllByText(/Message/i);
  userEvent.click(linkElement[0]);
  	expect(linkElement[0]).toBeInTheDocument();
})
