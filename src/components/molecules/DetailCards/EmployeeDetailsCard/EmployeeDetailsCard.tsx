import type { LibemaxEmployee } from "@/api/types";
import Button from "@/components/atoms/Button/Button";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { rewriteRoute } from "@/utils/routes";
import { Link, Mail, Phone, Trash2 } from "lucide-react";
import styles from './EmployeeDetailsCard.module.scss';


const EmployeeDetailsCard = ({ employee, toggleDelete }: { employee: LibemaxEmployee, toggleDelete: (employee: LibemaxEmployee) => void }) => {
  const { name, surname, id: libemax_id, phone, email } = employee;
  return (
    <DetailCard
      header={<div>{name} {surname}</div>}
      body={
        <div>
          <div>
            ID Libemax: {libemax_id}
          </div>
          {phone && (
            <div>
              <Phone size={12} />
              {phone}
            </div>
          )}
          {email && (
            <div >
              <Mail size={12} />
              {email}
            </div>
          )}
        </div>
      }
      actions={[
          <LinkComponent key="details" to={rewriteRoute(ROUTES.EMPLOYEE_DETAIL, {':employeeId': libemax_id.toString()})}>
            <Link size={16} />
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