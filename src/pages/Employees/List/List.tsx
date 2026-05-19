import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import styles from './List.module.scss'
import type { LibemaxEmployee } from "@/api/employeesService";
import { rewriteRoute } from "@/utils/routes";
import { ROUTES } from "@/constants/routes";
import { FileText, PlusCircle, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import Button from "@/components/atoms/Button/Button";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";
import { useEmployeesList } from "@/hooks/api/useEmployeesHooks";

const LibemaxEmployees = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curEmployee, setCurEmployee] = useState<LibemaxEmployee | undefined>()

  const {t} = useTranslation("employee", {keyPrefix: "list"});

  const openDeleteModalHdlr = (employee: LibemaxEmployee) => {
    setCurEmployee(employee);
    setOpenModal(true);
  }

  return (
    <div className="p-libemax-employees">
      <DeleteModal openModal={openModal}
        setOpenModal={setOpenModal}
        curEmployee={curEmployee}
      />

      <Card additionalClassName={styles["p-libemax-employees__card-title"]}>
        <div className={styles["p-libemax-employees__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-libemax-employees__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.INSERT_EMPLOYEE}><PlusCircle /></LinkComponent>
        </div>
      </Card>

      <Card additionalClassName={styles["p-libemax-employees__card"]}>
        <TablePaginated<LibemaxEmployee>
          useQueryHook={useEmployeesList} 
          initialPerPage={10} 
          filterConfig={[
            { key: 'name', placeholder: '', label: 'Cerca Nome' },
            { key: 'email', placeholder: '', label: 'Cerca Email' },
          ]}
          
          columns={[
            {
              key: 'name',
              header: t('table.name')
            },
            {key: 'surname', header: t('table.surname')},
            {key: 'email', header: t('table.email')},
            {key: 'phone', header: t('table.phone')},
          ]}
             
          actions={
            [
              (row) => (
                <LinkComponent
                  key="details"
                  color='custom'
                  to={rewriteRoute(ROUTES.EMPLOYEE_DETAIL, {':employeeId': row.id.toString()})}
                >
                  <FileText />
                </LinkComponent>
              ),
              (row) => (
                <Button
                  key="remove"
                  color="custom"
                  additionalClassName={styles["p-libemax-employees__btn-delete"]}
                  onClick={() => openDeleteModalHdlr(row)}
                >
                  <Trash2 />
                </Button>
              ),
            ]
          }
        />
      </Card>
    </div>
  );
};

export default LibemaxEmployees;
