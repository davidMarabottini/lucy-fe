import clsx from 'clsx';
import styles from './Typography.module.scss';
import type { TypographyProps } from './Typography.types';
import type { ElementType } from 'react';

const Typography = <T extends ElementType = 'p'>({
  children,
  variant = 'body',
  as,
  additionalClasses,
  color = 'text',
  ...rest
}: TypographyProps<T>) => {
  
  const Component = as || (variant.startsWith('h') ? variant : 'p');

  const classes = clsx(
    styles['c-typography'],
    styles[`c-typography--${variant}`],
    styles[`c-typography--${color}`],
    additionalClasses
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;
