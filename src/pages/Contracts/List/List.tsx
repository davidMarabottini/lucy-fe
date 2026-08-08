import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useContracts } from "@/hooks/api/ContractHooks";
import styles from './List.module.scss'; 
import { type Contract } from "@/api/types";
import { ROUTES } from "@/constants/routes";
import { Edit2, Eye, PlusCircle, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button/Button";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import Paginated from "@/components/organisms/Paginated/Paginated";
import { rewriteRoute } from "@/utils/routes";
import Table from "@/components/organisms/Table/Table";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import { useViewStore } from "@/zustand/listViewAsCard";

const ContractsList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curContract, setCurContract] = useState<Contract | undefined>();

  const { t } = useTranslation("contract", { keyPrefix: "list" });

  const openDeleteModalHdlr = (contract: Contract) => {
    setCurContract(contract);
    setOpenModal(true);
  };

  const isCardView = useViewStore((state) => state.isCardView)
  const actions = (contract: Contract) => [
    <LinkComponent
      key="details"
      color='custom'
      to={rewriteRoute(ROUTES.CONTRACT_DETAIL, {':contractId': contract.id.toString()})}
    >
      <Eye />
    </LinkComponent>,
    <LinkComponent
      key="edit"
      color='custom'
      to={rewriteRoute(ROUTES.CONTRACT_EDIT, { ':idContract': contract.id.toString() })}
    >
      <Edit2 />
    </LinkComponent>,
    <Button
      key="remove"
      color="custom"
      additionalClassName={styles["p-contracts__btn-delete"]}
      onClick={() => openDeleteModalHdlr(contract)}
    >
      <Trash2 />
    </Button>,
  ]

  return (
    <div className={styles["p-contracts"]}>
      {curContract && (
        <DeleteModal 
          openModal={openModal} 
          setOpenModal={setOpenModal} 
          curContract={curContract} 
        />
      )}
      
      <Card additionalClassName={styles["p-contracts__card-title"]}>
        <div className={styles["p-contracts__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-contracts__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.CONTRACT_INSERT}>
              <PlusCircle size={24} />
            </LinkComponent>
        </div>
      </Card>

      <Card additionalClassName={styles["p-contracts__card"]}>
        <Paginated<Contract>
          useQueryHook={useContracts} 
          initialPerPage={10} 
          filterConfig={[
            { key: 'contract_code', placeholder: '', label: 'Cerca Codice' },
            { key: 'description', placeholder: '', label: 'Cerca Descrizione' },
          ]}  
        >
          {(res) => {
            return isCardView ? (
              <div className={styles["p-contracts__grid"]}>
                {res.map((contract) => (
                  <DetailCard
                    key={contract.id}
                    header={<div>{contract.contract_code}</div>}
                    body={
                      <div>
                        <div>{t('table.provider')}: {contract.provider_company?.name || '-'}</div>
                        <div>{t('table.client')}: {contract.client?.name || '-'}</div>
                        <div>{t('table.start_date')}: {contract.start_date ? new Date(contract.start_date).toLocaleDateString('it-IT') : '-'}</div>
                        <div>{t('table.end_date')}: {contract.end_date ? new Date(contract.end_date).toLocaleDateString('it-IT') : '-'}</div>
                        <div>{t('table.description')}: {contract.description || '-'}</div>
                      </div>
                    }
                    actions={actions(contract)}
                  />
                ))}
              </div>
            ) : (
              <Table
                data={res}
                columns={[
                  {
                    key: 'contract_code',
                    header: t('table.contract_code')
                  },
                  {
                    key: 'provider_company',
                    header: t('table.provider'),
                    value: (row) => row.provider_company?.name || '-'
                  },
                  {
                    key: 'client',
                    header: t('table.client'),
                    value: (row) => row.client?.name || '-'
                  },
                  {
                    key: 'start_date',
                    header: t('table.start_date'),
                    value: (row) => row.start_date ? new Date(row.start_date).toLocaleDateString('it-IT') : '-'
                  },
                  {
                    key: 'end_date',
                    header: t('table.end_date'),
                    value: (row) => row.end_date ? new Date(row.end_date).toLocaleDateString('it-IT') : '-'
                  },
                  {
                    key: 'description',
                    header: t('table.description'),
                    value: (row) => row.description || '-'
                  }
                ]}
                actions={actions}
                getRowKey={(row) => String(row.contract_code)}
              />
            );
          }}
        </Paginated>
      </Card>
    </div>
  );
};

export default ContractsList;