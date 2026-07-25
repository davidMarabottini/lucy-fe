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
          initialPerPage={20} 
          filterConfig={[
            { key: 'name', placeholder: '', label: 'Cerca Nome' },
            { key: 'email', placeholder: '', label: 'Cerca Email' },
          ]}
        >
          {(res) => (
            <div className={styles["p-libemax-clients__grid"]}>
            {res.map(client =>
              <ClientDetailCard
                key={client.id}
                client={client}
                toggleDelete={openDeleteModalHdlr}
              />
            )}
            </div>
          )}
        </Paginated>
      </Card>
    </div>
  );
};

export default LibemaxClients;
