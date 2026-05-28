import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import styles from './List.module.scss'
import type { LibemaxEmployee } from "@/api/types";
import { ROUTES } from "@/constants/routes";
import {  PlusCircle } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import Paginated from "@/components/organisms/Paginated/Paginated";
import { useEmployeesList } from "@/hooks/api/useEmployeesHooks";
import EmployeeDetailCard from "./components/EmployeeDetailCard/EmployeeDetailCard";

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
          {(res) => (
            <div className={styles["p-libemax-employees__grid"]}>
              {
                res.map((employee) =>
                  <EmployeeDetailCard
                    key={employee.libemax_id}
                    employee={employee}
                    toggleDelete={openDeleteModalHdlr}
                  />)
              }
            </div>
          )}
        </Paginated>
      </Card>
    </div>
  );
};

export default LibemaxEmployees;
