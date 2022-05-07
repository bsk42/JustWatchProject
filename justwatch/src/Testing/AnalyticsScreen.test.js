/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom/extend-expect';
 import '@testing-library/jest-dom';
 import AnalyticsScreen from '../Screens/AnalyticsScreen';

 test('Weekly App Usage', () => {
    render(<AnalyticsScreen  />);
    const linkElement = screen.getByText(/Average User Watch Stats/i);
  	// expect(screen.getByText(/Weekly App Usage/i)).toBeVisible();
    expect(linkElement).toBeInTheDocument();
})

  test('Weekly App Usage of User', () => {
    render(<AnalyticsScreen  />);
    const linkElement = screen.getByText(/My Watch Stats/i);
    // expect(screen.getByText(/Weekly App Usage/i)).toBeVisible();
    expect(linkElement).toBeInTheDocument();
})