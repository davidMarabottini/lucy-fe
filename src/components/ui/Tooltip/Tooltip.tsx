import React, { useState, useId } from 'react';
import { Info } from 'lucide-react';
import { type TooltipProps } from './Tooltip.types';
import styles from './Tooltip.module.scss';

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      <div
        className={styles.trigger}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        tabIndex={0}
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children ?? <Info className={styles.defaultIcon} />}
      </div>

      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={`${styles.tooltip} ${styles[position]}`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;