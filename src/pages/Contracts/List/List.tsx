import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useContracts } from "@/hooks/api/ContractHooks";
import styles from './List.module.scss'; 
// import Table from "@/components/organisms/Table/Table";
import { type Contract } from "@/api/contractService";
import { ROUTES } from "@/constants/routes";
import { FileText, PlusCircle, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button/Button";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";
import { rewriteRoute } from "@/utils/routes";

const ContractsList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curContract, setCurContract] = useState<Contract | undefined>();

  const { t } = useTranslation("contract", { keyPrefix: "list" });

  const openDeleteModalHdlr = (contract: Contract) => {
    setCurContract(contract);
    setOpenModal(true);
  };

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
        <TablePaginated<Contract>
          useQueryHook={useContracts} 
          initialPerPage={10} 
          filterConfig={[
            { key: 'contract_code', placeholder: '', label: 'Cerca Codice' },
            { key: 'description', placeholder: '', label: 'Cerca Descrizione' },
          ]}  
          
          columns={[
            {
              key: 'contract_code',
              header: t('table.contract_code')
            },
            {
              key: 'provider',
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
          actions={[
            (row) => (
                <LinkComponent
                  key="details"
                  color='custom'
                  to={rewriteRoute(ROUTES.CONTRACT_DETAIL, {':contractId': row.id.toString()})}
                >
                  <FileText />
                </LinkComponent>
              ),
            (row) => (
              <Button
                key="remove"
                color="custom"
                additionalClassName={styles["p-contracts__btn-delete"]}
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

export default ContractsList;