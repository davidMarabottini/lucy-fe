import clsx from "clsx";
import type { StackProperties } from "./Stack.types";
import style from './Stack.module.scss';

const Stack = ({ children, spacing = 'md', direction = 'column', additionalClassName, ...props }: StackProperties) => {
  return (
    <div
      data-testid="stack-container"
      className={
        clsx(
          style['c-stack'],
          style[`c-stack--${spacing}`],
          style[`c-stack--${direction}`],
          additionalClassName
        )
      }
      {...props}
    >
      {children}
    </div>
  );
};

export default Stack;