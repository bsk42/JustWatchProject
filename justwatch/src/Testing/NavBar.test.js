/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom/extend-expect';
 import '@testing-library/jest-dom';
 import NavBar from '../Components/NavBarComponent';
import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event'




 test('Logout', () => {
    render(<Router>
        <NavBar />
      </Router>
      );
    const linkElement = screen.getByText(/Logout/i);
  	expect(linkElement).toBeInTheDocument();
})

test('Groups', () => {
    render(<Router>
        <NavBar />
      </Router>
      );
    const linkElement = screen.getByText(/Groups/i);
    expect(linkElement).toBeInTheDocument();
})

test('click Profile', () => {
    render(<Router>
        <NavBar />
      </Router>
      );
  userEvent.click(screen.getByText("Profile"));
  
  expect(screen.getByText(/Profile/i)).toBeInTheDocument();
})

test('click Groups', () => {
    render(<Router>
        <NavBar />
      </Router>
      );
  userEvent.click(screen.getByText("Groups"));
  
  const linkElement = screen.getAllByText(/Groups/i);
    expect(linkElement[0]).toBeInTheDocument();
})

test('click analytics', () => {
    render(<Router>
        <NavBar />
      </Router>
      );
  userEvent.click(screen.getByText("Analytics"));
  
  expect(screen.getByText(/Analytics/i)).toBeInTheDocument();
})

test('click movies', () => {
    render(<Router>
        <NavBar />
      </Router>
      );
  userEvent.click(screen.getByText("Movie Selection"));
  
  expect(screen.getByText(/Movie Selection/i)).toBeVisible();
})

test('click logout', () => {
    render(<Router>
        <NavBar />
      </Router>
      );
  userEvent.click(screen.getByText("Logout"));
  
  expect(screen.getByText(/Logout/i)).toBeVisible();
})


