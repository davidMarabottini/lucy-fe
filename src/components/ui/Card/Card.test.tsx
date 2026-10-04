import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';
import styles from './Card.module.scss';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <span data-testid="child-element">Content</span>
      </Card>
    );

    const card = screen.getByText('Content');
    expect(card).toBeInTheDocument();
    
    expect(card.parentElement).toHaveClass(styles['c-card']);
  });

  it('applies additionalClassName when provided', () => {
    const customClass = 'my-custom-class';
    
    render(
      <Card additionalClassName={customClass}>
        <div>Test</div>
      </Card>
    );

    const cardElement = screen.getByText('Test').parentElement;
    expect(cardElement).toHaveClass(styles['c-card']);
    expect(cardElement).toHaveClass(customClass);
  });
});