import Card from '@components/ui/Card/Card';
import clsx from 'clsx';
import styles from "./ChangePassword.module.scss";
import { useTranslation } from 'react-i18next';
import { useChangePassword } from '@/hooks/api/useAuthenticationHooks';
import Form from '@components/organisms/form/Form';
import Stack from '@/components/ui/Stack/Stack';
import { LockKeyhole } from 'lucide-react';

type ChangePasswordData = {oldPassword: string, newPassword: string, repeatNewPassword: string};

const ChangePassword = () => {
  // const { mutate: login } = useLogin();
  const { mutate: changePassword } = useChangePassword();
  const {t} = useTranslation('features/changePassword');

  const onSubmit = (values: ChangePasswordData) => {
    changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword });
  };

  return (
    <div className={clsx(styles["p-login"], "l-grid")}>
      <Card additionalClassName="l-grid__col l-grid__col--span-12">
        <div className={styles["p-login__container"]}>
          <Form<ChangePasswordData> className={styles['p-login__form']} defaultValues={{ oldPassword: '', newPassword: '', repeatNewPassword: '' }} onSubmit={onSubmit}>
            <Stack spacing="md">
              <div style={{ marginBottom: '16px' }}>
              <Form.Input
                name="oldPassword"
                type="password"
                rules={{ required: t('error.required') }}
                label={t('form.oldPassword.label')}
              />
              </div>
              <div>
              <Form.Input
                name="newPassword"
                label={t('form.newPassword.label')}
                type="password"
                rules={{ required: t('error.required') }}
              />
              <Form.Input
                name="repeatNewPassword"
                label={t('form.repeatNewPassword.label')}
                type="password"
                rules={{ required: t('error.required'), validate: (value, formValues) => value === formValues.newPassword || t('error.passwordsMustMatch') }}
              />
              </div>
              <Form.Button additionalClassName={styles['p-login__button']} type="submit">
                <LockKeyhole size={16} /> {t("form.submit")}
              </Form.Button>
            </Stack>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default ChangePassword;
