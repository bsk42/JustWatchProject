/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom/extend-expect';
 import '@testing-library/jest-dom';
 import Movieselection from '../Screens/Movieselection';
  import userEvent from '@testing-library/user-event'


 test('Superlike', () => {
    render(<Movieselection />);
    expect(screen.getByText(/Superlike/i)).toBeVisible();
})


test('Dislike', () => {
    render(<Movieselection />);
    expect(screen.getByText(/Dislike/i)).toBeVisible();
})

test('Reviews', () => {
    render(<Movieselection />);
    expect(screen.getByText(/Reviews/i)).toBeVisible();
})

test('click like', () => {
    render(<Movieselection />);
    
     userEvent.click(screen.getByText("Like"));

    expect(screen.getByText(/Dislike/i)).toBeVisible();
})