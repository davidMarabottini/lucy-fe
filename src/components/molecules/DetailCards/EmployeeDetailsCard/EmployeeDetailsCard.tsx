import type { LibemaxEmployee } from "@/api/types";
import Button from "@/components/atoms/Button/Button";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { rewriteRoute } from "@/utils/routes";
import { Edit2, Link, Mail, Phone, Trash2 } from "lucide-react";
import styles from './EmployeeDetailsCard.module.scss';


const EmployeeDetailsCard = ({ employee, toggleDelete }: { employee: LibemaxEmployee, toggleDelete: (employee: LibemaxEmployee) => void }) => {
  const { name, surname, id: libemax_id, phone, email } = employee;
  return (
    <DetailCard
      header={<div>{name} {surname}</div>}
      body={
        <div className={styles["c-employees-details-card__body"]}>
          <div>
            ID Libemax: {libemax_id}
          </div>
          {phone && (
            <div className={styles["c-employees-details-card__icon-text"]}>
              <Phone size={12} />
              {phone}
            </div>
          )}
          {email && (
            <div className={styles["c-employees-details-card__icon-text"]} >
              <Mail size={12} />
              {email}
            </div>
          )}
        </div>
      }
      actions={[
          <LinkComponent key="details" to={rewriteRoute(ROUTES.EMPLOYEE_DETAIL, {':employeeId': libemax_id.toString()})}>
            <Link />
          </LinkComponent>,
          <LinkComponent key="edit" to={rewriteRoute(ROUTES.EDIT_EMPLOYEE, { ':idEmployee': libemax_id.toString() })}>
            <Edit2 />
          </LinkComponent>,
          <Button
          key="remove"
          color="custom"
          additionalClassName={styles["c-employees-details-card__btn-delete"]}
          onClick={() => toggleDelete(employee)}
        >
          <Trash2 />
        </Button>
      ]}
    />
  )
  
}

export default EmployeeDetailsCard;