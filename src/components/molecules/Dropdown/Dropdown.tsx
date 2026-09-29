import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import Button from '@components/atoms/Button/Button';
import styles from './Dropdown.module.scss';
import type { DropdownHeadProps } from './Dropdown.types.ts';
import { clsx } from 'clsx';

export const DropDownHead = ({ label, isOpen, setIsOpen, children, className }: DropdownHeadProps) => {
  const ddhClassName = clsx(styles['c-dropdown'], className);

  return (
    <RadixDropdown.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className={ddhClassName}>
        <RadixDropdown.Trigger asChild>
          <Button
            additionalClassName={styles['c-dropdown__trigger']}
            aria-haspopup="menu"
            color="custom"
          >
            {label}
          </Button>
        </RadixDropdown.Trigger>

        <RadixDropdown.Portal>
          <RadixDropdown.Content className={styles['c-dropdown__menu']} sideOffset={4} align="end">
            {children}
          </RadixDropdown.Content>
        </RadixDropdown.Portal>
      </div>
    </RadixDropdown.Root>
  );
};

export const DropDownItem = ({ children, onSelect, className }: { children: React.ReactNode, onSelect?: () => void, className?: string }) => {
  return (
    <RadixDropdown.Item asChild onSelect={onSelect} className={className}>
      {children}
    </RadixDropdown.Item>
  );
};
