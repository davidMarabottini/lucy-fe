import { forwardRef, useState } from "react";
import type { SelectProps } from "./Select.types";
import styles from './Select.module.scss';
import Input from "../../atoms/Input/Input";
import clsx from "clsx";

const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ options, name, defaultValue, className, onValueChange: onChange, label, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [curValue, setCurValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);

    const filteredOptions = options.filter(opt => 
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option: { label: string, value: string }) => {
      setSearchTerm(option.label);
      onChange?.(option.value);
      setCurValue(option.value);
      setIsOpen(false);
    };

    return (
      <div
        onBlur={() => setIsOpen(false)}
        className={clsx(styles['c-select'], className)}
      >
        <input
          type="hidden"
          name={name}
          value={curValue}
          ref={ref}
        />

        <Input
          label={label}
          placeholder=" "
          {...props}
          name={name}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          autoComplete="off"
        />

        {isOpen && (
           <ul className={styles['c-select__menu']}>
             {filteredOptions.map(opt => (
               <li key={opt.value} onMouseDown={() => handleSelect(opt)}>
                 {opt.label}
               </li>
             ))}
           </ul>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
