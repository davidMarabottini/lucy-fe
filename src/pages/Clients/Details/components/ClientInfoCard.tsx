import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import styles from "../Details.module.scss";
import { Building, Mail, Phone } from "lucide-react";
import type { LibemaxClientDetail } from "@/api/types";

const ClientInfoCard = ({ client }: { client?: LibemaxClientDetail }) => {
  return (
    <Card additionalClassName={styles["p-client-detail__card"]}>
      <div className={styles["p-client-detail__container"]} style={{ flexDirection: 'row' }}>
        <Building size={180} className={styles["p-client-detail__icon"]} style={{ borderRadius: "100%", background: "#f0f0f0",  padding: '24px'}} />
          <div>
            <div>
              <Typography variant="h1">{client?.name}</Typography>
            </div>

            <div className={styles["p-client-detail__client-sheet"]} style={{ flexDirection: 'row', gap: '16px', alignItems: 'center', marginTop: '32px', marginLeft: '32px' }}>
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
