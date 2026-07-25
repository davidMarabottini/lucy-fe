import clsx from "clsx";
import styles from "./DetailCard.module.scss";
import type { DetailCardProps } from "./DetailCard.types";

const DetailCard = ({ header, body, actions, isSelected }: DetailCardProps) => {
  return (
    <div className={clsx(styles["c-detail-card"], isSelected && styles["c-detail-card--selected"])}>
      <div className={styles["c-detail-card__header"]}>
        {header}
      </div>
      <div className={styles["c-detail-card__body"]}>
        {body}
      </div>
      {actions && actions.length > 0 && (
        <div className={styles["c-detail-card__footer"]}>
          {actions}
        </div>
      )}
    </div>
  );
};

export default DetailCard;
