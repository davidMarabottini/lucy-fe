import Card from "@/components/atoms/Card/Card"
import clsx from "clsx"
import styles from './Status.module.scss'
import ResultCircle from "@/components/atoms/ResultCircle/ResultCircle"
import { Mail, Smartphone } from 'lucide-react';
import BadgeContainer from "./components/BadgeContainer/BadgeContainer"
import HamSpamTable from "./components/HamSpamTable/HamSpamTable"
import { useUserStatus } from "@/hooks/api/useUserHooks"
import { useTranslation } from "react-i18next"
import Typography from "@/components/atoms/Typography/Typography"

const Status = () => {
  const {data, isLoading, isError} = useUserStatus();
  
  const {t} = useTranslation('status');
  

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isError || !data) {
    return <div>Error</div>
  }

  const {contributions, user, badges, privileges} = data;

  return (
    <div className={clsx(styles["p-status"], "l-grid")}>
      <Card additionalClassName={clsx(styles["p-status__contributions-card"], "l-grid__col l-grid__col--span-5")}>
        <Typography variant="h3" className={styles["p-status__subtitle"]}>
          {t("contribution.title")}
        </Typography>
        <HamSpamTable ham={contributions.mail.ham} spam={contributions.mail.spam}>
          <Typography additionalClasses={styles["p-status__ham-spam-head"]} as="div">
            <Mail size={16} /> {t("contribution.areas.mail")}
          </Typography>
        </HamSpamTable>
        <HamSpamTable ham={contributions.sms.ham} spam={contributions.sms.spam}>
          <Typography additionalClasses={styles["p-status__ham-spam-head"]} as="div">
            <Smartphone size={16} /> {t("contribution.areas.sms")}
          </Typography>
        </HamSpamTable>
      </Card>
      <Card additionalClassName={clsx(styles['p-status__progress-card'],"l-grid__col l-grid__col--span-4")}>
        <Typography as="h3" additionalClasses={styles["p-status__subtitle"]}>{t('progress.level', {level: user.level})}</Typography>
        <Typography as="strong">
          {t("progress.title")}
        </Typography>
        <ResultCircle percentage={user.nextLevelProgress} />
        <Typography as="p">{user.rank}</Typography>
      </Card>
      <Card additionalClassName={clsx(styles['p-status__badges-card'], "l-grid__col l-grid__col--span-3")}>
        <Typography as="h3" className={styles["p-status__subtitle"]}>{t('badges.title')}</Typography>
        <div className="l-grid">
          {
            badges.map(({id, name}) => (
              <div key={id} className="l-grid__col l-grid__col--span-12 l-grid--3">
                <BadgeContainer badgeName={name} />
              </div>
            ))
          }
        </div>
      </Card>
      <Card additionalClassName={clsx(styles['p-status__priviledges-card'], "l-grid__col l-grid__col--span-12")}>
        <strong>{t('privileges.title')}</strong>
        <div className={styles['p-status__internal-priviledges-card']}>
          {privileges.map((x) => (
            <div key={x} className={styles['p-status__priviledge']}>
              <Typography as="p" color="muted">{x}</Typography>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Status
