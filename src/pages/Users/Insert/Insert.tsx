import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Insert.module.scss";
import { useTranslation } from 'react-i18next';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import type { RegistrationForm } from './Insert.types';
import { useInsertUser } from '@/hooks/api/useUserHooks';
import { VALIDATIONS_EMAIL } from '@constants/validations';
import { ROUTES } from '@constants/routes';
import Typography from '@components/atoms/Typography/Typography';
import { Check, ChevronLeft, X } from 'lucide-react';
import { ICON_PRESET } from '@/components/atoms/RadioBtn/presets/icon.presets';
import { useOptions } from '@/hooks/useOptions';
import type { AvailableGendersType } from '@/types/contentsFormDatas.types';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';
import { useState } from 'react';
import Switch from '@/components/atoms/Switch/Switch';
import type { UseFormReturn } from 'react-hook-form';

const Registration = () => {
  const [locNavigate, setLockNavigate] = useState<boolean>(false)
  
  const {t} = useTranslation("user", {keyPrefix: "insert"});
  const {mutate: insertUser, error} = useInsertUser(locNavigate);

  const onSubmit = (values: RegistrationForm, method: UseFormReturn<RegistrationForm>) => {
    const { repeatPassword: _repeatPassword, ...payload } = values;
    insertUser(payload);
    method.reset()
  };

  const init = {
    name: '',
    surname: '',
    // birthday: '',
    gender: 'O' as AvailableGendersType,
    username: '',
    password: '',
  }

  const {classBase, ...iconPresetRest} = ICON_PRESET;

  const { gender } = useOptions()

  const btnClass = clsx(styles['p-insert-user__button'], "l-grid__col l-grid__col--span-6");

  return (
    <div>
      <Card additionalClassName={styles["p-insert-user__card-title"]}>
        <div className={styles["p-insert-user__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-insert-user__title"]}>
              {t("title")}
            </Typography>

            <LinkComponent to={ROUTES.USER_LIST}><ChevronLeft /></LinkComponent>
        </div>
      </Card>
      <Card additionalClassName={clsx(styles['p-insert-user'], "l-grid__col l-grid__col--span-12")}>
        <div className={styles["p-insert-user__container"]}>
          {error && <Typography>errore</Typography>}
          <Form<RegistrationForm>
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
                  name="surname"
                  label={t('form.surname.label')}
                  rules={{ required: t('form.surname.error.required') }}
                />
                {/* TODO: implementare un datePicker e aggiungere data di nascita */}
                <Form.RadioBtn
                  name="gender"
                  label={t("form.gender.label")}
                  className={clsx(classBase, "l-grid__col l-grid__col--span-6")}
                  rules={{ required: t('form.gender.error.required') }}
                  gap="lg"
                  options={gender}
                  {...iconPresetRest}
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
                  name="username"
                  label={t('form.username.label')}
                  rules={{ required: t('form.username.error.required') }}
                />
                <Form.Input
                  className="l-grid__col l-grid__col--span-6"
                  name="password"
                  label={t('form.password.label')}
                  type="password"
                  rules={{
                    required: t('form.password.error.required'),
                  }}
                />
                <Form.Input
                  className="l-grid__col l-grid__col--span-6"
                  name="repeatPassword"
                  label={t('form.repeatPassword.label')}
                  type="password"
                  rules={{
                    required: t('form.repeatPassword.error.required'),
                    validate: (value, formValues) => 
                      value === formValues.password || t('form.error.passwordsDoNotMatch')
                  }}
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
                <X size={16} /> Reset
              </Form.Button>
              </div>
            </Stack>
          </Form>
          <Switch
            onChange={res => setLockNavigate(!!res)}
            value={locNavigate}
            label={t('keepInPage')}
            additionalClassName={styles['p-insert-user__keep-in-page']}
          />
        </div>
      </Card>
    </div>
  );
};

export default Registration;
