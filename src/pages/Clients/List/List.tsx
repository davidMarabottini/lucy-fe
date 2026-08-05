import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useLibemaxClients } from "@/hooks/api/useClientHooks";
import styles from './List.module.scss'
import type { LibemaxClient } from "@/api/types";
import { ROUTES } from "@/constants/routes";
import { PlusCircle } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import Paginated from "@/components/organisms/Paginated/Paginated";
import ClientDetailCard from "./components/ClientDetailCard/ClientDetailCard";
import Table from "@/components/organisms/Table/Table";
import { useViewStore } from "@/zustand/listViewAsCard";
import { Edit2, Eye, Trash2 } from "lucide-react";
import Button from "@/components/atoms/Button/Button";
import { rewriteRoute } from "@/utils/routes";

const LibemaxClients = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curClient, setCurClient] = useState<LibemaxClient | undefined>()

  const {t} = useTranslation("client", {keyPrefix: "list"});

  const openDeleteModalHdlr = (client: LibemaxClient) => {
    setCurClient(client);
    setOpenModal(true);
  }

  const isCardView = useViewStore((state) => state.isCardView)

  return (
    <div className="p-libemax-clients">
      {curClient && (
        <DeleteModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          curClient={curClient}
        />
      )}

      <Card additionalClassName={styles["p-libemax-clients__card-title"]}>
        <div className={styles["p-libemax-clients__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-libemax-clients__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.INSERT_CLIENT}><PlusCircle /></LinkComponent>
        </div>
      </Card>

      <Card additionalClassName={styles["p-libemax-clients__card"]}>
        <Paginated<LibemaxClient>
          useQueryHook={useLibemaxClients} 
          initialPerPage={20} 
          filterConfig={[
            { key: 'name', placeholder: '', label: 'Cerca Nome' },
            { key: 'email', placeholder: '', label: 'Cerca Email' },
          ]}
        >
          {(res) => {
            return isCardView ? (
              <div className={styles["p-libemax-clients__grid"]}>
                {res.map(client =>
                  <ClientDetailCard
                    key={client.id}
                    client={client}
                    toggleDelete={openDeleteModalHdlr}
                  />
                )}
              </div>
            ) : (
              <Table<LibemaxClient>
                data={res}
                columns={[
                  { key: "id", header: "ID Libemax" },
                  { key: "name", header: t("table.name") },
                  { key: "email", header: t("table.email") },
                  { key: "phone", header: t("table.phone") },
                ]}
                actions={[
                  ({ id }) => (
                    <LinkComponent key="details" to={rewriteRoute(ROUTES.CLIENT_DETAIL, { ':clientId': id.toString() })}>
                      <Eye />
                    </LinkComponent>
                  ),
                  ({ id }) => (
                    <LinkComponent key="edit" to={rewriteRoute(ROUTES.EDIT_CLIENT, { ':idClient': id.toString() })}>
                      <Edit2 />
                    </LinkComponent>
                  ),
                  (client) => (
                    <Button
                      key="remove"
                      color="custom"
                      additionalClassName={styles["p-libemax-clients__btn-delete"]}
                      onClick={() => openDeleteModalHdlr(client)}
                    >
                      <Trash2 />
                    </Button>
                  ),
                ]}
              />
            );
          }}
        </Paginated>
      </Card>
    </div>
  );
};

export default LibemaxClients;
