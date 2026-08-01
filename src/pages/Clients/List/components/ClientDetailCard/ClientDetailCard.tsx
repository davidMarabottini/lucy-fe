import type { LibemaxClient } from "@/api/types";
import Button from "@/components/atoms/Button/Button";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { rewriteRoute } from "@/utils/routes";
import { Link, Mail, Phone, Trash2 } from "lucide-react";
import styles from './ClientDetailCard.module.scss';


const ClientDetailCard = ({ client, toggleDelete }: { client: LibemaxClient, toggleDelete: (client: LibemaxClient) => void }) => {
  const { name, id: libemax_id, phone, email } = client;
  return (
    <DetailCard
      header={<div>{name}</div>}
      body={
        <div className={styles["c-clients-details-card__body"]}>
          <div>
            ID Libemax: {libemax_id}
          </div>
          {phone && (
            <div className={styles["c-clients-details-card__icon-text"]}>
              <Phone size={12} />
              {phone}
            </div>
          )}
          {email && (
            <div className={styles["c-clients-details-card__icon-text"]}>
              <Mail size={12} />
              {email}
            </div>
          )}
        </div>
      }
      actions={[
          <LinkComponent key="details" to={rewriteRoute(ROUTES.CLIENT_DETAIL, {':clientId': libemax_id?.toString() ?? ''})}>
            <Link size={16} />
          </LinkComponent>,
          <Button
            key="remove"
            color="custom"
            additionalClassName={styles["c-clients-details-card__btn-delete"]}
            onClick={() => toggleDelete(client)}
          >
            <Trash2 />
          </Button>
      ]}
    />
  )
  
}

export default ClientDetailCard;