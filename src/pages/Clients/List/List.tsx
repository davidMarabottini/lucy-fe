import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useLibemaxClients } from "@/hooks/api/useClientHooks";
import styles from './List.module.scss'
import type { LibemaxClient } from "@/api/types";
import { rewriteRoute } from "@/utils/routes";
import { ROUTES } from "@/constants/routes";
import { FileText, PlusCircle, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import Button from "@/components/atoms/Button/Button";
import Paginated from "@/components/organisms/Paginated/Paginated";
import Table from "@/components/organisms/Table/Table";

const LibemaxClients = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curClient, setCurClient] = useState<LibemaxClient | undefined>()

  const {t} = useTranslation("client", {keyPrefix: "list"});

  const openDeleteModalHdlr = (client: LibemaxClient) => {
    setCurClient(client);
    setOpenModal(true);
  }

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
          initialPerPage={10} 
          filterConfig={[
            { key: 'name', placeholder: '', label: 'Cerca Nome' },
            { key: 'email', placeholder: '', label: 'Cerca Email' },
          ]}
        >
          {(res) => (
            <Table
              data={res}
              columns={[
                {
                  key: 'name',
                  header: t('table.name')
                },
                {key: 'email', header: t('table.email')},
                {key: 'phone', header: t('table.phone')},
              ]}
              getRowKey={({id}) => id}
              actions={
                [
                  (row) => (
                    <LinkComponent
                      key="details"
                      color='custom'
                      to={rewriteRoute(ROUTES.CLIENT_DETAIL, {':clientId': row.id.toString()})}
                    >
                      <FileText />
                    </LinkComponent>
                  ),
                  (row) => (
                    <Button
                      key="remove"
                      color="custom"
                      additionalClassName={styles["p-libemax-clients__btn-delete"]}
                      onClick={() => openDeleteModalHdlr(row)}
                    >
                      <Trash2 />
                    </Button>
                  ),
                ]
              }
            />
          )}
        </Paginated>
      </Card>
    </div>
  );
};

export default LibemaxClients;
