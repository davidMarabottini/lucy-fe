import Card from "@components/ui/Card/Card";
import Typography from "@/components/ui/Typography/Typography";
import { useGroupCompanies } from "@/hooks/api/GroupCompanyHooks";
import styles from './List.module.scss'; 
import { type GroupCompany } from "@/api/types";
import { ROUTES } from "@/constants/routes";
import { ArrowRight, Edit2, Eye, PlusCircle, Send, Trash2 } from "lucide-react";
import LinkComponent from "@/components/ui/LinkComponent/LinkComponent";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/Button/Button";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import Paginated from "@/components/organisms/Paginated/Paginated";
import { rewriteRoute } from "@/utils/routes";
import Table from "@/components/organisms/Table/Table";
import DetailCard from "@/components/Cards/DetailCard/DetailCard";
import { useViewStore } from "@/zustand/listViewAsCard";
import { useCompanyStore } from "@/zustand/currentCompany";

const GroupCompaniesList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curCompany, setCurCompany] = useState<GroupCompany | undefined>();
  const companyStore = useCompanyStore();

  const { t } = useTranslation("features/groupCompany", { keyPrefix: "list" });
  useEffect(() => {
    console.log('Current company store:', companyStore);
  }, [companyStore]);


  const openDeleteModalHdlr = (company: GroupCompany) => {
    setCurCompany(company);
    setOpenModal(true);
  };

  const isCardView = useViewStore((state) => state.isCardView)

  const actions = (company: GroupCompany) => [
    <LinkComponent
      key="details"
      color='custom'
      className="t-btn-link"
      to={rewriteRoute(ROUTES.GROUP_COMPANY_DETAIL, {':companyId': company.id.toString()})}
    >
      <Eye />
    </LinkComponent>,
    <LinkComponent
      key="edit"
      color='custom'
      className="t-btn-link"
      to={rewriteRoute(ROUTES.GROUP_COMPANY_EDIT, {':idCompany': company.id.toString()})}
    >
      <Edit2 />
    </LinkComponent>,
    <Button
      key="remove"
      color="custom"
      additionalClassName="t-btn-link t-btn-delete"
      onClick={() => openDeleteModalHdlr(company)}
    >
      <Trash2 />
    </Button>,
    <Button
      key="view"
      color="custom"
      additionalClassName="t-btn-link"
      onClick={() => companyStore.setCompany(company.id, company.name)}
    >
      <Send />
    </Button>
  ]

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
        <Paginated<GroupCompany>
          area="group-companies"
          useQueryHook={useGroupCompanies} 
          initialPerPage={10} 
          filterConfig={[
            { key: 'name', placeholder: '', label: 'Cerca Nome' },
            { key: 'email', placeholder: '', label: 'Cerca Email' },
          ]}
        >
          {(res) => {            
            return isCardView ? (
              <div className={styles["p-companies__grid"]}>
                {res.map((company) => (
                  <DetailCard
                    key={company.id}
                    header={<div>{company.name}</div>}
                    body={
                      <div>
                        <div>{t('table.vat_number')}: {company.vat_number}</div>
                        <div>{t('table.sectors')}: {company.sectors.map((s) => s.name).join(', ') || '-'}</div>
                      </div>
                    }
                    actions={actions(company)}
                  />
                ))}
              </div>
            ) : (
              <Table
                data={res}
                columns={[
                  { key: 'name', header: t('table.name') },
                  { key: 'vat_number', header: t('table.vat_number') },
                  {
                    key: 'sectors',
                    header: t('table.sectors'),
                    value: row => row.sectors.map(s => s.name).join(', ')
                  },
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

export default GroupCompaniesList;