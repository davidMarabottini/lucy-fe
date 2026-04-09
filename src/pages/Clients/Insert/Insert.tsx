import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Insert.module.scss";
import { useTranslation } from 'react-i18next';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import type { LibemaxClientForm } from './Insert.types';
import { useInsertClient } from '@/hooks/api/useClientHooks';
import { VALIDATIONS_EMAIL } from '@constants/validations';
import Typography from '@components/atoms/Typography/Typography';
import { Check, ChevronLeft, X } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';
import { useState } from 'react';
import Switch from '@/components/atoms/Switch/Switch';
import type { UseFormReturn } from 'react-hook-form';

const InsertClient = () => {
  const [locNavigate, setLockNavigate] = useState<boolean>(false)
  const {t} = useTranslation("client", {keyPrefix: "insert"});
  const {mutate: insertClient, error} = useInsertClient(locNavigate);

  const onSubmit = (payload: LibemaxClientForm, methods: UseFormReturn<LibemaxClientForm>) => {
    insertClient(payload);
    methods.reset();
  };

  const init = {
    name: '',
    mail: '',
    phone: '',
  }

  const btnClass = clsx(styles['p-insert-client__button'], "l-grid__col l-grid__col--span-6");

  return (
    <div className={styles['p-insert-client']}>
      <Card additionalClassName={styles["p-insert-client__card-title"]}>
        <div className={styles["p-insert-client__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-insert-client__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.LIBEMAX_CLIENTS}><ChevronLeft /></LinkComponent>
        </div>
      </Card>
      <Card additionalClassName={clsx(styles['p-insert-client'], "l-grid__col l-grid__col--span-12")}>
        <div className={styles["p-insert-client__container"]}>
          {error && <Typography>errore</Typography>}
          <Form<LibemaxClientForm>
            defaultValues={init}
            onSubmit={onSubmit}
          >
            <Stack spacing='md'>
              <div className="l-grid">
                <Form.Input
                  className="l-grid__col l-grid__col--span-6"
                  name="name"
                  label={t('form.name.label')}
                  rules={{ required: t('form.name.error.required') }}
                />
                
                <Form.Input
                  className="l-grid__col l-grid__col--span-6"
                  name="email"
                  label={t('form.email.label')}
                  rules={{
                    required: t('form.email.error.required'),
                    pattern: {
                      value: VALIDATIONS_EMAIL,
                      message: t('form.email.error.errorFormat'),
                    },
                  }}
                />
                <Form.Input
                  className="l-grid__col l-grid__col--span-6"
                  name="phone"
                  label={t('form.phone.label')}
                  rules={{ required: t('form.phone.error.required') }}
                />
                <div></div>
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
            </Stack>
          </Form>
          <Switch
            onChange={res => setLockNavigate(!!res)}
            value={locNavigate}
            label={t('keepInPage')}
            additionalClassName={styles['p-insert-client__keep-in-page']}
          />
        </div>
      </Card>
    </div>
  );
};

export default InsertClient;
