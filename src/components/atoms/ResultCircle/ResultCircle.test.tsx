import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResultCircle from './ResultCircle';
import style from './ResultCircle.module.scss';

describe('ResultCircle Component', () => {
  it.each([
    { percentage: 40, expectedClass: style['c-result-circle--legit'] },
    { percentage: 60, expectedClass: style['c-result-circle--spam'] },
  ])('adds $expectedClass on root for percentage $percentage',
    ({ percentage, expectedClass }) => {
      const { container } = render(<ResultCircle percentage={percentage} />);
      expect(screen.getByText(`${percentage}%`)).toBeInTheDocument();
      expect(container.firstElementChild).toHaveClass(expectedClass);
    }
  );
});
