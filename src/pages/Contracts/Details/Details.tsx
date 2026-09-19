import { useParams } from "react-router-dom";
import { useContractDetail } from "@/hooks/api/ContractHooks";
import { useTranslation } from "react-i18next";
import CardContract from "./components/CardContract";
import CardContractDetails from "./components/CardContractDetails";
import Card from "@/components/atoms/Card/Card";
import Paginated from "@/components/organisms/Paginated/Paginated";
import type { LibemaxEmployee } from "@/api/types";
import { Mail, Phone } from "lucide-react";
// import type LibemaxEmployees from "@/pages/Employees/List/List";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import { useGetEmployeesByContractId } from "@/hooks/api/useEmployeesHooks";
// import CardEmployee from "./components/CardEmployee";
import styles from "./Details.module.scss";

// --- Main Page ---
const ContractDetailPage = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const { data, isLoading, error } = useContractDetail(Number(contractId));
  const { t } = useTranslation("features/contract", { keyPrefix: "details" });

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data || !contractId) return null;

  return (
    <div>
      <CardContract data={data} />
      <CardContractDetails contractId={contractId} />
      <Card>
        <Paginated<LibemaxEmployee>
          area={`contract-detail-employees-${contractId}`}
          useQueryHook={() => useGetEmployeesByContractId(contractId)} 
          initialPerPage={20} 
          filterConfig={[
            // { key: 'contract_id', placeholder: '', label: 'Cerca Contratto', value: contractId, type: 'hidden' },
            { key: 'name', placeholder: '', label: 'Cerca Nome' },
            { key: 'email', placeholder: '', label: 'Cerca Email' },
          ]}
        >
          {/*TODO: devo prendere solo gli utenti legati al contratto */}
          {(res) => (
              <div className={styles["p-contract-detail__grid"]}>
                {res.map(({employee}) => (
                  <DetailCard
                    key={employee.id}
                    header={<div>{employee.name} {employee.surname}</div>}
                    body={
                      <div>
                        <div>
                          ID Libemax: {employee.id}
                        </div>
                        {employee.phone && (
                          <div>
                            <Phone size={12} />
                            {employee.phone}
                          </div>
                        )}
                        {employee.email && (
                          <div>
                            <Mail size={12} />
                            {employee.email}
                          </div>
                        )}
                      </div>
                    }
                    // actions={actions(employee)}
                  />
                ))}
              </div>
            )
            
          }
        </Paginated>
      </Card>
    </div>
  );
};

export default ContractDetailPage;