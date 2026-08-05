import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import styles from './List.module.scss'
import type { LibemaxEmployee } from "@/api/types";
import { ROUTES } from "@/constants/routes";
import {  Edit2, Eye, PlusCircle, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import Paginated from "@/components/organisms/Paginated/Paginated";
import { useEmployeesList } from "@/hooks/api/useEmployeesHooks";
import EmployeeDetailsCard from "@/components/molecules/DetailCards/EmployeeDetailsCard/EmployeeDetailsCard";
import { useViewStore } from "@/zustand/listViewAsCard";
import { rewriteRoute } from "@/utils/routes";
import Button from "@/components/atoms/Button/Button";
import Table from "@/components/organisms/Table/Table";

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
        <Paginated<LibemaxEmployee>
          useQueryHook={useEmployeesList} 
          initialPerPage={20} 
          filterConfig={[
            { key: 'name', placeholder: '', label: 'Cerca Nome' },
            { key: 'email', placeholder: '', label: 'Cerca Email' },
          ]}
        >
          {(res) => {
            const isCardView = useViewStore.getState().isCardView;
            return isCardView ? (
              <div className={styles["p-libemax-employees__grid"]}>
                {res.map((employee) => (
                  <EmployeeDetailsCard
                    key={employee.libemax_id}
                    employee={employee}
                    toggleDelete={openDeleteModalHdlr}
                  />
                ))}
              </div>
            ) : (
              <Table<LibemaxEmployee>
                data={res}
                columns={[
                  {key: "libemax_id", header: t("table.libemaxId")},
                  {key: "name", header: t("table.name") },
                  {key: "email", header: t("table.email") },
                  {key: "phone", header: t("table.phone")},
                  {key: "email", header: t("table.email")},
                  
                ]}
                 actions={[
                    ({id}) => <LinkComponent key="details" to={rewriteRoute(ROUTES.EMPLOYEE_DETAIL, {':employeeId': id.toString()})}>
                      <Eye />
                    </LinkComponent>,
                    ({id}) => <LinkComponent key="edit" to={rewriteRoute(ROUTES.EDIT_EMPLOYEE, { ':idEmployee': id.toString() })}>
                      <Edit2 />
                    </LinkComponent>,
                    (employee) => <Button
                    key="remove"
                    color="custom"
                    additionalClassName={styles["c-employees-details-card__btn-delete"]}
                    onClick={() => openDeleteModalHdlr(employee)}
                  >
                    <Trash2 />
                  </Button>
                ]}
              />
            )
          }}
        </Paginated>
      </Card>
    </div>
  );
};

export default LibemaxEmployees;
