import type { LibemaxClient } from "@/api/types";
import Button from "@/components/atoms/Button/Button";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { rewriteRoute } from "@/utils/routes";
import { Link, Mail, Phone, Trash2 } from "lucide-react";
import styles from '../../List.module.scss'


const ClientDetailCard = ({ client, toggleDelete }: { client: LibemaxClient, toggleDelete: (client: LibemaxClient) => void }) => {
  const { name, id: libemax_id, phone, email } = client;
  return (
    <DetailCard
      header={<div>{name}</div>}
      body={
        <div>
          <div>
            ID Libemax: {libemax_id}
          </div>
          {phone && (
            <div>
              <Phone size={12} />
              {phone}
            </div>
          )}
          {email && (
            <div >
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
          additionalClassName={styles["p-libemax-clients__btn-delete"]}
          onClick={() => toggleDelete(client)}
        >
          <Trash2 />
        </Button>
      ]}
    />
  )
  
}

export default ClientDetailCard;