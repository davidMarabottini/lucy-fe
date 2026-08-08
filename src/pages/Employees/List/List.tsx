import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import styles from './List.module.scss'
import type { LibemaxEmployee } from "@/api/types";
import { ROUTES } from "@/constants/routes";
import {  Edit2, Eye, Mail, Phone, PlusCircle, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import Paginated from "@/components/organisms/Paginated/Paginated";
import { useEmployeesList } from "@/hooks/api/useEmployeesHooks";
import { useViewStore } from "@/zustand/listViewAsCard";
import { rewriteRoute } from "@/utils/routes";
import Button from "@/components/atoms/Button/Button";
import Table from "@/components/organisms/Table/Table";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";

const LibemaxEmployees = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curEmployee, setCurEmployee] = useState<LibemaxEmployee | undefined>()

  const {t} = useTranslation("employee", {keyPrefix: "list"});

  const openDeleteModalHdlr = (employee: LibemaxEmployee) => {
    setCurEmployee(employee);
    setOpenModal(true);
  }

  const isCardView = useViewStore((state) => state.isCardView)

  const actions = useCallback((employee: LibemaxEmployee) => [
    <LinkComponent key="details" to={rewriteRoute(ROUTES.EMPLOYEE_DETAIL, {':employeeId': employee.id.toString()})}>
      <Eye />
    </LinkComponent>,
    <LinkComponent key="edit" to={rewriteRoute(ROUTES.EDIT_EMPLOYEE, { ':idEmployee': employee.id.toString() })}>
      <Edit2 />
    </LinkComponent>,
    <Button
      key="remove"
      color="custom"
      additionalClassName={styles["c-employees-details-card__btn-delete"]}
      onClick={() => openDeleteModalHdlr(employee)}
    >
      <Trash2 />
    </Button>
  ], []);

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
          {(res) => isCardView ? (
              <div className={styles["p-libemax-employees__grid"]}>
                {res.map((employee) => (
                  <DetailCard
                    key={employee.id}
                    header={<div>{employee.name} {employee.surname}</div>}
                    body={
                      <div className={styles["c-employees-details-card__body"]}>
                        <div>
                          ID Libemax: {employee.id}
                        </div>
                        {employee.phone && (
                          <div className={styles["c-employees-details-card__icon-text"]}>
                            <Phone size={12} />
                            {employee.phone}
                          </div>
                        )}
                        {employee.email && (
                          <div className={styles["c-employees-details-card__icon-text"]} >
                            <Mail size={12} />
                            {employee.email}
                          </div>
                        )}
                      </div>
                    }
                    actions={actions(employee)}
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
                ]}
                actions={actions}
              />
            )
          }
        </Paginated>
      </Card>
    </div>
  );
};

export default LibemaxEmployees;
