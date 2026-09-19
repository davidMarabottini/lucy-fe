import Card from "@components/atoms/Card/Card";
import { useUsers } from "@/hooks/api/useUserHooks";
import Typography from "@/components/atoms/Typography/Typography";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { Edit2, Eye, PlusCircle, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from './List.module.scss'
import { useMe } from "@/hooks/api/useAuthenticationHooks";
import Button from "@/components/atoms/Button/Button";
import { useState } from "react";
import type { UsersResult } from "@/api/types";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import Paginated from "@/components/organisms/Paginated/Paginated";
import Table from "@/components/organisms/Table/Table";
import { rewriteRoute } from "@/utils/routes";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import { useViewStore } from "@/zustand/listViewAsCard";

const User = () => {
  const {t} = useTranslation("features/user", {keyPrefix: "list"});
  const { data: me } = useMe()

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curClient, setCurClient] = useState<UsersResult | undefined>()

  const openDeleteModalHdlr = (client: UsersResult) => {
    setCurClient(client);
    setOpenModal(true);
  }

  const isCardView = useViewStore((state) => state.isCardView)

  const actions = (user: UsersResult) => [
    <LinkComponent
      key="details"
      color="custom"
      className="t-btn-link"
      to={rewriteRoute(ROUTES.USER_DETAILS, {':userId': user.id.toString()})}
    >
      <Eye />
    </LinkComponent>,
    <LinkComponent
      key="edit"
      color="custom"
      className="t-btn-link"
      to={rewriteRoute(ROUTES.UPDATE_USER, {':userId': user.id.toString()})}
    >
      <Edit2 />
    </LinkComponent>,
    <Button
      key="delete"
      color="custom"
      additionalClassName="t-btn-link t-btn-delete"
      disabled={me?.id === user.id}
      onClick={() => openDeleteModalHdlr(user)}
    >
      <Trash2 />
    </Button>,
  ]

  return (
    <div>
      {
        curClient && <DeleteModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          curUser={curClient}
        />
      }
      <Card additionalClassName={styles["p-user-list__card-title"]}>
        <div className={styles["p-user-list__card-title-internal"]}>
            <Typography
              variant="h2"
              additionalClasses={styles["p-user-list__title"]}
            >
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.REGISTRATION}>
              <PlusCircle />
            </LinkComponent>
        </div>
      </Card>
      <Card>
        <Paginated<UsersResult>
          area="users"
          useQueryHook={useUsers}
          filterConfig={[
            {key: 'name', placeholder: '', label: 'Cerca per nome'},
            {key: 'surname', placeholder: '', label: 'Cerca per Cognome'},
            {key: 'username', placeholder: '', label: 'Cerca per username'},
            {key: 'email', placeholder: '', label: 'Cerca per email'}
          ]}
        >
          {(res) => {
            return isCardView ? (
              <div className={styles["p-user-list__grid"]}>
                {res.map((user) => (
                  <DetailCard
                    key={user.id}
                    header={<div>{user.name} {user.surname}</div>}
                    body={
                      <div>
                        <div>{user.email}</div>
                        <div>{user.username}</div>
                        <div>{user.roles.join(', ')}</div>
                      </div>
                    }
                    actions={actions(user)}
                  />
                ))}
              </div>
            ) : (
              <Table<UsersResult>
                data={res}
                columns={[
                  {key: 'name', header: t("table.name")},
                  {key: 'surname', header: t("table.surname")},
                  {key: 'email', header: t("table.email")},
                  {key: 'username', header: t("table.username")},
                  {key: 'roles', header: t("table.roles") },
                ]}
                actions={actions}
              />
            );
          }}
        </Paginated>
      </Card>
    </div>
  )
}

export default User;
