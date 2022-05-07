/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom/extend-expect';
 import '@testing-library/jest-dom';
 import Movieselection from '../Screens/Movieselection';

 test('Superlike', () => {
    render(<Movieselection />);
    // userEvent.click(screen.getByText("Leaderboard"));
    expect(screen.getByText(/Superlike/i)).toBeVisible();
})


test('Dislike', () => {
    render(<Movieselection />);
    // userEvent.click(screen.getByText("Leaderboard"));
    expect(screen.getByText(/Dislike/i)).toBeVisible();
})

test('Reviews', () => {
    render(<Movieselection />);
    // userEvent.click(screen.getByText("Leaderboard"));
    expect(screen.getByText(/Reviews/i)).toBeVisible();
})