import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useGroupCompanies } from "@/hooks/api/GroupCompanyHooks";
import styles from './List.module.scss'; 
import { type GroupCompany } from "@/api/groupCompanyService";
import { ROUTES } from "@/constants/routes";
import { FileText, PlusCircle, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button/Button";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";
import { rewriteRoute } from "@/utils/routes";

const GroupCompaniesList = () => {
  const { data: companies, isLoading, error } = useGroupCompanies();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curCompany, setCurCompany] = useState<GroupCompany | undefined>();

  const { t } = useTranslation("groupCompany", { keyPrefix: "list" });

  const openDeleteModalHdlr = (company: GroupCompany) => {
    setCurCompany(company);
    setOpenModal(true);
  };

  if (isLoading) return <div className={styles["p-companies__loading"]}>{t("additiveMessages.loading")}</div>;
  if (error) return <Typography color="error">{t("additiveMessages.updateError")}</Typography>;
  if (!companies) return null;

  return (
    <div className={styles["p-companies"]}>
      {curCompany && (
        <DeleteModal 
          openModal={openModal} 
          setOpenModal={setOpenModal} 
          curGroupCompany={curCompany} 
        />
      )}
      
      <Card additionalClassName={styles["p-companies__card-title"]}>
        <div className={styles["p-companies__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-companies__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.GROUP_COMPANY_INSERT}>
              <PlusCircle size={24} />
            </LinkComponent>
        </div>
      </Card>

      <Card additionalClassName={styles["p-companies__card"]}>
        <TablePaginated<GroupCompany>
          useQueryHook={useGroupCompanies} 
          initialPerPage={10} 
          filterConfig={[
            { key: 'name', placeholder: '', label: 'Cerca Nome' },
            { key: 'email', placeholder: '', label: 'Cerca Email' },
          ]}
          
        columns={[
            { key: 'name', header: t('table.name') },
            { key: 'vat_number', header: t('table.vat_number') },
            { 
              key: 'sectors', 
              header: t('table.sectors'),
              value: (row) => row.sectors.map(s => s.name).join(', ') 
            },
          ]}
          actions={[
            (row) => (
                <LinkComponent
                  key="details"
                  color='custom'
                  to={rewriteRoute(ROUTES.GROUP_COMPANY_DETAIL, {':companyId': row.id.toString()})}
                >
                  <FileText />
                </LinkComponent>
              ),
            (row) => (
              <Button
                key="remove"
                color="custom"
                additionalClassName={styles["p-companies__btn-delete"]}
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

export default GroupCompaniesList;