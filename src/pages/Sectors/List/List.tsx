import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useSectors } from "@/hooks/api/useSectors"; // Hook creato precedentemente
import styles from './List.module.scss'; // Riutilizziamo lo stesso stile o uno dedicato
import Table from "@/components/organisms/Table/Table";
import { type Sector } from "@/api/sectorService";
import { ROUTES } from "@/constants/routes";
import { PlusCircle, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button/Button";
import {DeleteModal} from "./components/DeleteModal/DeleteModal";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";

const SectorsList = () => {
  // Utilizziamo l'hook specifico per i settori
  // const { data: sectors, isLoading, error } = useSectors();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curSector, setCurSector] = useState<Sector | undefined>();

  // Namespace i18n dedicato ai settori
  const { t } = useTranslation("sector", { keyPrefix: "list" });

  const openDeleteModalHdlr = (sector: Sector) => {
    setCurSector(sector);
    setOpenModal(true);
  };

  // if (isLoading) return <div className={styles["p-sectors__loading"]}>{t("additiveMessages.loading")}</div>;
  // if (error) return <Typography color="error">{t("additiveMessages.updateError")}</Typography>;
  // if (!sectors) return null;

  return (
    <div className={styles["p-sectors"]}>
      {curSector && (
        <DeleteModal 
          openModal={openModal} 
          setOpenModal={setOpenModal} 
          curSector={curSector} 
        />
      )}
      
      <Card additionalClassName={styles["p-sectors__card-title"]}>
        <div className={styles["p-sectors__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-sectors__title"]}>
              {t("title")}
            </Typography>
            {/* Ricordati di aggiungere SECTOR_INSERT nelle tue ROUTES se non l'hai fatto */}
            <LinkComponent to={ROUTES.SECTOR_INSERT || '/sectors/insert'}>
              <PlusCircle size={24} />
            </LinkComponent>
        </div>
      </Card>

      <Card additionalClassName={styles["p-sectors__card"]}>
        <TablePaginated<Sector>
          useQueryHook={useSectors}
          initialPerPage={10}
          filterConfig={[
            { key: 'name', placeholder: '', label: 'Cerca Nome' },
          ]}
          columns={[
            { key: 'name', header: t('table.name') },
            { key: 'description', header: t('table.description') },
          ]}
          actions={[
            (row) => (
              <Button
                key="remove"
                color="custom"
                additionalClassName={styles["p-sectors__btn-delete"]}
                onClick={() => openDeleteModalHdlr(row)}
              >
                <Trash2 size={18} />
              </Button>
            ),
          ]}
        />
      </Card>
    </div>
  );
};

export default SectorsList;