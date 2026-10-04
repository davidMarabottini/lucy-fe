import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Stack from './Stack';
import style from './Stack.module.scss';

describe('Stack component', () => {
  const spacings = ['lg', 'md', 'sm'] as ('lg' | 'md' | 'sm')[];
  const directions = ['column', 'row'] as ('column' | 'row')[];
  it('renders correctly', () => {
    render(
      <Stack data-testid="stack-container">
        <div>el1</div>
        <div>el2</div>
      </Stack>
    );
    const stack = screen.getByTestId('stack-container');
  
    expect(stack).toHaveClass(style['c-stack']);
    expect(stack).toHaveClass(style['c-stack--md']);
    expect(stack).toHaveClass(style['c-stack--column']);
    expect(screen.getByText(/el1/i)).toBeInTheDocument();
    expect(screen.getByText(/el2/i)).toBeInTheDocument();
  });

  it.each(spacings.map(x => ({value: x, result: `c-stack--${x}`})))(
    `should have class $result`, ({value, result}) => {
      render(
      <Stack spacing={value} data-testid="stack-container">
        <div>el1</div>
      </Stack>
    );
  
    expect(screen.getByTestId('stack-container')).toHaveClass(style[result]);
  });

  it.each(directions.map(x => ({value: x, result: `c-stack--${x}`})))(
    `should have class $result`, ({value, result}) => {
      render(
      <Stack direction={value} data-testid="stack-container">
        <div>el1</div>
      </Stack>
    );
  
    expect(screen.getByTestId('stack-container')).toHaveClass(style[result]);
  });

  it('should manage additionalClassName', () => {
     render(
      <Stack additionalClassName="c-test-class" data-testid="stack-container">
        <div>el1</div>
      </Stack>
    );

    expect(screen.getByTestId('stack-container')).toHaveClass('c-test-class');
  })
});