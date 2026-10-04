import type { CardProps } from "./Card.types";
import styles from "./Card.module.scss";
import clsx from "clsx";

const Card = ({ additionalClassName, children }: CardProps) => {
  return <div className={clsx(styles['c-card'], additionalClassName)}>{children}</div>;
};
export default Card;