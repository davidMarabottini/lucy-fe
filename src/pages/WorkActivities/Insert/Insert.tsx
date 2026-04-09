import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Insert.module.scss";
import { useTranslation } from 'react-i18next';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import { useInsertWorkActivity } from '@/hooks/api/useWorkActivity'; // Hook corretto
import Typography from '@components/atoms/Typography/Typography';
import { Check, ChevronLeft, X } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';
import Switch from '@/components/atoms/Switch/Switch';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';

// Tipo locale per il form basato sul tuo nuovo modello DB
type WorkActivityForm = {
  name: string;
  description: string;
};

const InsertWorkActivity = () => {
  const [locNavigate, setLockNavigate] = useState<boolean>(false)
  const { t } = useTranslation('workActivity', {keyPrefix: 'insert'});
  const { mutate: insertActivity, error } = useInsertWorkActivity(locNavigate);

  const onSubmit = (payload: WorkActivityForm, methods: UseFormReturn<WorkActivityForm>) => {
    insertActivity(payload);
    methods.reset();
  };

  const init: WorkActivityForm = {
    name: '',
    description: '',
  };

  const btnClass = clsx(styles['p-insert-activity__button'], "l-grid__col l-grid__col--span-6");

  return (
    <div className={styles['p-insert-activity']}>
      <Card additionalClassName={styles["p-insert-activity__card-title"]}>
        <div className={styles["p-insert-activity__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-insert-activity__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.WORK_ACTIVITIES}><ChevronLeft /></LinkComponent>
        </div>
      </Card>

      <Card additionalClassName={clsx(styles['p-insert-activity'], "l-grid__col l-grid__col--span-12")}>
        <div className={styles["p-insert-activity__container"]}>
          {error && <Typography color="error">{t("form.error.generic")}</Typography>}
          
          <Form<WorkActivityForm>
            defaultValues={init}
            onSubmit={onSubmit}
          >
            <Stack spacing='md'>
              <div className="l-grid">
                {/* Campo Nome Attività */}
                <Form.Input
                  className="l-grid__col l-grid__col--span-12"
                  name="name"
                  label={t('form.name.label')}
                  rules={{ required: t('form.name.error.required') }}
                />
                
                <Form.Input
                  className="l-grid__col l-grid__col--span-12"
                  name="description"
                  label={t('form.description.label')}
                  rules={{ required: t('form.description.error.required') }}
                />

                <div className="l-grid__col l-grid__col--span-12 l-grid l-grid--inner">
                  <Form.Button
                    additionalClassName={btnClass}
                    type="submit"
                    autoDisabled={false}
                  >
                    <Check size={16} /> {t("form.submit")}
                  </Form.Button>
                  
                  <Form.Button
                    additionalClassName={btnClass}
                    type="reset"
                    color='secondary'
                    autoDisabled={false}
                  >
                    <X size={16} /> {t("form.reset")}
                  </Form.Button>
                </div>
              </div>
            </Stack>
          </Form>
          <Switch
            onChange={res => setLockNavigate(!!res)}
            value={locNavigate}
            label={t('keepInPage')}
            additionalClassName={styles['p-insert-activity__keep-in-page']}
          />
        </div>
      </Card>
    </div>
  );
};

export default InsertWorkActivity;