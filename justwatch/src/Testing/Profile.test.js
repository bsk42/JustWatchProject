/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom/extend-expect';
 import '@testing-library/jest-dom';
 import Profile from '../Screens/Profile';


 test('Profile', () => {
    render(<Profile />);
    const linkElement = screen.getByText(/Profile/i);
  	expect(linkElement).toBeInTheDocument();
})

  test('genre', () => {
    render(<Profile />);
    const linkElement = screen.getByText(/Genre/i);
  	expect(linkElement).toBeInTheDocument();
})
