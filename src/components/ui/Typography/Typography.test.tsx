import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Typography from './Typography';
import styles from './Typography.module.scss';

describe('Typography Component', () => {
  it.each([
    { variant: 'h1', expectedTag: 'h1' },
    { variant: 'h3', expectedTag: 'h3' },
    { variant: 'body', expectedTag: 'p' },
  ] as const)('renderizza il tag <$expectedTag> per la variante "$variant"', ({ variant, expectedTag }) => {
    const { container } = render(<Typography variant={variant}>Test</Typography>);
    expect(container.querySelector(expectedTag)).toBeInTheDocument();
  });

  it.each([
    { variant: 'h1', as: 'span' },
    { variant: 'body', as: 'section' },
    { variant: 'small', as: 'div' },
  ] as const)('sovrascrive la variante $variant con il tag <$as>', ({ variant, as }) => {
    const { container } = render(<Typography variant={variant} as={as}>Test</Typography>);
    expect(container.querySelector(as)).toBeInTheDocument();
    expect(container.querySelector(variant.startsWith('h') ? variant : 'p')).not.toBeInTheDocument();
  });

  it.each([
    'h1', 'body', 'small'
  ] as const)('applica la classe corretta per la variante "%s"', (variant) => {
    render(<Typography variant={variant}>Test</Typography>);
    expect(screen.getByText('Test')).toHaveClass(styles[`c-typography--${variant}`]);
  });

  it.each([
    'text', 'primary', 'secondary', 'success', 'error', 'muted'
  ] as const)('applica la classe corretta per il colore "%s"', (color) => {
    render(<Typography color={color}>Test</Typography>);
    expect(screen.getByText('Test')).toHaveClass(styles[`c-typography--${color}`]);
  });

  it.each([
    { props: { id: 'test-id' }, attr: 'id', value: 'test-id' },
    { props: { title: 'hover-me' }, attr: 'title', value: 'hover-me' },
    { props: { 'aria-label': 'test-label' }, attr: 'aria-label', value: 'test-label' },
  ])('passa correttamente l\'attributo $attr', ({ props, attr, value }) => {
    render(<Typography {...props}>Test</Typography>);
    expect(screen.getByText('Test')).toHaveAttribute(attr, value);
  });

});