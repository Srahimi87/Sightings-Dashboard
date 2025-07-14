import { render, screen } from '@testing-library/react';
import Header from './Header';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
    const title = screen.getByRole('heading', {
      name: /UFO Sightings Dashboard/i,
      level: 1,
    });
    expect(title).toBeInTheDocument();
  });

  it('uses semantic HTML elements', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header.tagName).toBe('HEADER');
  });
});
