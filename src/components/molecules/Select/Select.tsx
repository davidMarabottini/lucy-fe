import { forwardRef, useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import type { SelectProps } from "./Select.types";
import styles from './Select.module.scss';
import Input from "../../atoms/Input/Input";
import clsx from "clsx";

const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ options, name, defaultValue, className, onValueChange: onChange, label, ...props }, ref) => {
    const initialLabel = options.find(opt => opt.value === defaultValue)?.label || "";
    const [searchTerm, setSearchTerm] = useState(initialLabel);
    const [curValue, setCurValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({
      top: 0,
      left: 0,
      width: 0,
      transform: "none",
      maxHeight: 250,
    });

    const updateCoords = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      const estimatedMenuHeight = 220; 

      const showAbove = spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow;

      setCoords({
        left: rect.left,
        width: rect.width,
        top: showAbove ? rect.top - 4 : rect.bottom + 4,
        transform: showAbove ? "translateY(-100%)" : "none",
        maxHeight: Math.min(250, showAbove ? spaceAbove - 12 : spaceBelow - 12),
      });
    };

    useLayoutEffect(() => {
      if (!isOpen) return;

      updateCoords();

      window.addEventListener("scroll", updateCoords, true);
      window.addEventListener("resize", updateCoords);

      return () => {
        window.removeEventListener("scroll", updateCoords, true);
        window.removeEventListener("resize", updateCoords);
      };
    }, [isOpen]);

    const filteredOptions = options.filter(opt =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option: { label: string; value: string }) => {
      setSearchTerm(option.label);
      onChange?.(option.value);
      setCurValue(option.value);
      setIsOpen(false);
    };

    const handleBlur = (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setIsOpen(false);
        const selectedOpt = options.find(opt => opt.value === curValue);
        setSearchTerm(selectedOpt?.label || "");
      }
    };

    return (
      <div
        ref={containerRef}
        onBlur={handleBlur}
        className={clsx(styles['c-select'], className)}
      >
        <input type="hidden" name={name} value={curValue} ref={ref} />

        <Input
          label={label}
          placeholder=" "
          {...props}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          autoComplete="off"
        />

        {isOpen && createPortal(
          <ul
            className={styles['c-select__menu']}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              transform: coords.transform,
              maxHeight: `${coords.maxHeight}px`,
              overflowY: "auto",
              zIndex: 9999,
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => (
                <li key={opt.value} onMouseDown={() => handleSelect(opt)}>
                  {opt.label}
                </li>
              ))
            ) : (
              <li className={styles['c-select__no-options']}>Nessun risultato</li>
            )}
          </ul>,
          document.body
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
