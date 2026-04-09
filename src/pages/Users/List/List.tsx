import Card from "@components/atoms/Card/Card";
import { useUsers } from "@/hooks/api/useUserHooks";
import Table from "@/components/organisms/Table/Table";
import Typography from "@/components/atoms/Typography/Typography";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { PlusCircle, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from './List.module.scss'
import { useMe } from "@/hooks/api/useAuthenticationHooks";
import Button from "@/components/atoms/Button/Button";
import { useState } from "react";
import type { UsersResult } from "@/api/userService";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";

const User = () => {
  const {data: users} = useUsers();
  const {t} = useTranslation("user", {keyPrefix: "list"});
  const { data: me } = useMe()

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curClient, setCurClient] = useState<UsersResult | undefined>()

    const openDeleteModalHdlr = (client: UsersResult) => {
      console.log(client);
      setCurClient(client);
      setOpenModal(true);
    }

  return (
    <div>
      <DeleteModal openModal={openModal} setOpenModal={setOpenModal} curUser={curClient} />
      <Card additionalClassName={styles["p-user-list__card-title"]}>
        <div className={styles["p-user-list__card-title-internal"]}>
            <Typography variant="h2"
            additionalClasses={styles["p-user-list__title"]}
            >
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.REGISTRATION}><PlusCircle /></LinkComponent>
        </div>
      </Card>
      <Card>
        <Table<UsersResult>
          data={users || []}
          columns={[
            {key: 'name', header: t("table.name")},
            {key: 'surname', header: t("table.surname")},
            {key: 'email', header: t("table.email")},
            {key: 'username', header: t("table.username")},
            {key: 'roles', header: t("table.roles") },
              // render: (roles: string[]) => roles.join(", ")
          ]}
          actions={[
            row => 
              <Button
              key="delete"
              color="custom"
              className={styles["p-user-list__btn-delete"]}
              disabled={me?.id === row.id}
              onClick={() => openDeleteModalHdlr(row)}
              ><Trash2 /></Button>
            
          ]}
        />
      </Card>
    </div>
  )
}

export default User;
