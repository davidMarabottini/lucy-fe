import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import styles from "../Details.module.scss";
import { Building, Mail, Phone } from "lucide-react";
import type { LibemaxClientDetail } from "@/api/types";

const ClientInfoCard = ({ client }: { client?: LibemaxClientDetail }) => {
  return (
    <Card additionalClassName={styles["p-client-detail__card"]}>
      <div className={styles["p-client-detail__container"]}>
        <Building size={180} className={styles["p-client-detail__icon"]} />
        <div>
          <div>
            <Typography variant="h1">{client?.name}</Typography>
          </div>

          <div className={styles["p-client-detail__client-sheet"]}>
            <div>
              {client?.phone && <div><Phone /> {client.phone}</div>}
              {client?.email && <div><Mail /> {client.email}</div>}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ClientInfoCard;
