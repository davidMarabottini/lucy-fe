import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useContracts } from "@/hooks/api/ContractHooks";
import styles from './List.module.scss'; 
import { type Contract } from "@/api/types";
import { ROUTES } from "@/constants/routes";
import { Edit2, FileText, Option, PlusCircle, Settings2, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button/Button";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import Paginated from "@/components/organisms/Paginated/Paginated";
import { rewriteRoute } from "@/utils/routes";
import Table from "@/components/organisms/Table/Table";

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
        <Paginated<Contract>
          useQueryHook={useContracts} 
          initialPerPage={10} 
          filterConfig={[
            { key: 'contract_code', placeholder: '', label: 'Cerca Codice' },
            { key: 'description', placeholder: '', label: 'Cerca Descrizione' },
          ]}  
        >
          {(res) => (
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
                  <LinkComponent
                    key="edit"
                    color='custom'
                    to={rewriteRoute(ROUTES.CONTRACT_EDIT, { ':idContract': row.id.toString() })}
                  >
                    <Edit2 />
                  </LinkComponent>
                ),
                (row) => (
                  <Button
                    key="remove"
                    color="custom"
                    additionalClassName={styles["p-contracts__btn-delete"]}
                    onClick={() => openDeleteModalHdlr(row)}
                  >
                    <Trash2 />
                  </Button>
                ),
                // (row) => (
                //   <LinkComponent
                //     key="setDetails"
                //     color='custom'
                //     to={rewriteRoute(ROUTES.CONTRACT_SET_DETAILS, { ':contractId': row.id.toString() })}
                //   >
                //     <Settings2 />
                //   </LinkComponent>
                // )
              ]}
              getRowKey={(row) => String(row.contract_code)}
            />
          )}
        </Paginated>
      </Card>
    </div>
  );
};

export default ContractsList;