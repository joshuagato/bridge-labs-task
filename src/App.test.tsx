import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test("APP_RENDER", () => {
    render(<App />);
    const linkElements = screen.getAllByRole("link");
    expect(linkElements).toHaveLength(7); // Vite and React logos + 5 links
  });
});