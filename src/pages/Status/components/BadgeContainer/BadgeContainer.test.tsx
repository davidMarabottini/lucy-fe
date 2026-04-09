import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BadgeContainer from './BadgeContainer';

describe('BadgeContainer', () => {
  it('should render the badge name text', () => {
    render(<BadgeContainer badgeName="Test badge" />);

    const text = screen.getByText('Test badge');
    expect(text).toBeVisible();
    expect(text.tagName).toBe('P');
  });
});
