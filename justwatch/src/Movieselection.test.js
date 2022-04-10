/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import App from './App';
 // import renderer from 'react-test-renderer';
 import '@testing-library/jest-dom';
 import Movieselection from './Movieselection';

 test('Superlike', () => {
    render(<Movieselection />);
    // userEvent.click(screen.getByText("Leaderboard"));
    expect(screen.getByText(/Superlike/i)).toBeVisible();
})

test('Title', () => {
    render(<Movieselection />);
    // userEvent.click(screen.getByText("Leaderboard"));
    expect(screen.getByText(/JustWatch/i)).toBeVisible();
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