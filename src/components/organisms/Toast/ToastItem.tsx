import clsx from "clsx";
import type { IToastItem } from "./Toast.types";
import styles from './ToastItem.module.scss';

const ToastItem = ({msg, type}: Omit<IToastItem, 'id'>) => {
  return(<div className={clsx(styles['c-toast-item'], styles[`c-toast-item--${type}`])} >
    {msg}
  </div>)
}

export default ToastItem