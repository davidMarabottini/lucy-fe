import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useGroupCompanies } from "@/hooks/api/GroupCompanyHooks";
import styles from './List.module.scss'; 
import { type GroupCompany } from "@/api/types";
import { ROUTES } from "@/constants/routes";
import { Edit2, FileText, PlusCircle, Trash2 } from "lucide-react";
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

const GroupCompaniesList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curCompany, setCurCompany] = useState<GroupCompany | undefined>();

  const { t } = useTranslation("groupCompany", { keyPrefix: "list" });

  const openDeleteModalHdlr = (company: GroupCompany) => {
    setCurCompany(company);
    setOpenModal(true);
  };

  const isCardView = useViewStore((state) => state.isCardView)

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
                    actions={[
                      <LinkComponent
                        key="details"
                        color='custom'
                        to={rewriteRoute(ROUTES.GROUP_COMPANY_DETAIL, {':companyId': company.id.toString()})}
                      >
                        <FileText />
                      </LinkComponent>,
                      <LinkComponent
                        key="edit"
                        color='custom'
                        to={rewriteRoute(ROUTES.GROUP_COMPANY_EDIT, {':idCompany': company.id.toString()})}
                      >
                        <Edit2 />
                      </LinkComponent>,
                      <Button
                        key="remove"
                        color="custom"
                        additionalClassName={styles["p-companies__btn-delete"]}
                        onClick={() => openDeleteModalHdlr(company)}
                      >
                        <Trash2 />
                      </Button>,
                    ]}
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
                actions={(row) =>[
                   (
                      <LinkComponent
                        key="details"
                        color='custom'
                        to={rewriteRoute(ROUTES.GROUP_COMPANY_DETAIL, {':companyId': row.id.toString()})}
                      >
                        <FileText />
                      </LinkComponent>
                    ),
                   (
                      <LinkComponent
                        key="edit"
                        color='custom'
                        to={rewriteRoute(ROUTES.GROUP_COMPANY_EDIT, {':idCompany': row.id.toString()})}
                      >
                        <Edit2 />
                      </LinkComponent>
                    ),
                   (
                    <Button
                      key="remove"
                      color="custom"
                      additionalClassName={styles["p-companies__btn-delete"]}
                      onClick={() => openDeleteModalHdlr(row)}
                    >
                      <Trash2  />
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

export default GroupCompaniesList;