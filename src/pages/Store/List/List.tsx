import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useStores } from "@/hooks/api/useStores"; // Hook creato precedentemente
import styles from './List.module.scss'; // Riutilizziamo lo stesso stile o uno dedicato
import Table from "@/components/organisms/Table/Table";
import { type Store } from "@/api/types";
import { ROUTES } from "@/constants/routes";
import { Edit2, Eye, PlusCircle, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button/Button";
import {DeleteModal} from "./components/DeleteModal/DeleteModal";
import Paginated from "@/components/organisms/Paginated/Paginated";
import { rewriteRoute } from "@/utils/routes";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import { useViewStore } from "@/zustand/listViewAsCard";

const StoresList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curStore, setCurStore] = useState<Store | undefined>();

  const { t } = useTranslation("features/store", { keyPrefix: "list" });

  const openDeleteModalHdlr = (store: Store) => {
    setCurStore(store);
    setOpenModal(true);
  };
  const isCardView = useViewStore((state) => state.isCardView)

  //TODO: sostituire con store
  const actions = (store: Store) => [
    <LinkComponent
      key="details"
      color="custom"
      className="t-btn-link"
      to={rewriteRoute(ROUTES.STORE_DETAILS, {':idStore': store?.id.toString() || '0'})}
    >
      <Eye />
    </LinkComponent>,
    <LinkComponent
      key="edit"
      color="custom"
      className="t-btn-link"
      to={rewriteRoute(ROUTES.STORE_EDIT, { ':idStore': store?.id.toString() || '0'})}
    >
      <Edit2 size={18} />
    </LinkComponent>,
    <Button
      key="remove"
      color="custom"
      additionalClassName="t-btn-link t-btn-delete"
      onClick={() => openDeleteModalHdlr(store)}
    >
      <Trash2 size={18} />
    </Button>,
  ]

  // if (isLoading) return <div className={styles["p-stores__loading"]}>{t("additiveMessages.loading")}</div>;
  // if (error) return <Typography color="error">{t("additiveMessages.updateError")}</Typography>;
  // if (!stores) return null;

  return (
    <div className={styles["p-stores"]}>
      {curStore && (
        <DeleteModal 
          openModal={openModal} 
          setOpenModal={setOpenModal} 
          curStore={curStore} 
        />
      )}
      
      <Card additionalClassName={styles["p-stores__card-title"]}>
        <div className={styles["p-stores__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-stores__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.STORE_INSERT}>
              <PlusCircle size={24} />
            </LinkComponent>
        </div>
      </Card>

      <Card additionalClassName={styles["p-stores__card"]}>
        {/*Store */}
        <Paginated<any>
          area="stores"
          useQueryHook={useStores}
          initialPerPage={10}
          filterConfig={[
            { key: 'name', placeholder: '', label: 'Cerca Nome' },
          ]}
        >
          {(res) => {
            return isCardView ? (
              <div className={styles["p-stores__grid"]}>
                {res.map((store) => (
                  <DetailCard
                    key={store.id}
                    header={<div>{store.name}</div>}
                    body={<div>{store.description || '-'}</div>}
                    actions={actions(store)}
                  />
                ))}
              </div>
            ) : (
              <Table
                data={res}
                columns={[
                  { key: 'name', header: t('table.name') },
                  { key: 'description', header: t('table.description') },
                ]}
                actions={actions}
              />
            );
          }}
        </Paginated>
      </Card>
    </div>
  );
};

export default StoresList;