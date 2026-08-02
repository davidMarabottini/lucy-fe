import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Insert.module.scss";
import { useTranslation } from 'react-i18next';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import type { LibemaxEmployeeForm } from './Insert.types';
import { useEmployeeDetail, useInsertEmployee, useUpdateEmployee } from '@/hooks/api/useEmployeesHooks';
import { VALIDATIONS_EMAIL } from '@constants/validations';
import Typography from '@components/atoms/Typography/Typography';
import { Check, ChevronLeft, X } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';
import { useState } from 'react';
import Switch from '@/components/atoms/Switch/Switch';
import type { UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const InsertEmployee = () => {
  const { idEmployee: employeeIdParams } = useParams<{ idEmployee?: string }>();
  const employeeId = employeeIdParams ? parseInt(employeeIdParams, 10) : undefined;
  const isEditMode = Boolean(employeeId);

  const [locNavigate, setLockNavigate] = useState<boolean>(false)
  const {t} = useTranslation("employee", {keyPrefix: "insert"});

  const { data: employeeData, isFetched: isFetchedEmployee } = useEmployeeDetail(employeeId ?? 0, { enabled: isEditMode });
  const {mutate: insertEmployee, error} = useInsertEmployee(locNavigate);
  const {mutate: editEmployee, error: editError} = useUpdateEmployee(employeeId);

  const onSubmit = (payload: LibemaxEmployeeForm, methods: UseFormReturn<LibemaxEmployeeForm>) => {
    const { dirtyFields } = methods.formState;

    if (isEditMode) {
      const modifiedData = Object.keys(dirtyFields).reduce((acc, key) => {
        acc[key] = payload[key as keyof LibemaxEmployeeForm];
        return acc;
      }, {} as Partial<LibemaxEmployeeForm>);

      editEmployee(modifiedData);
      return;
    }

    insertEmployee(payload);
    methods.reset();
  };

  const init: LibemaxEmployeeForm = !isEditMode ? {
    name: '',
    surname: '',
    phone: '',
    email: '',
  } : {
    name: employeeData?.name ?? '',
    surname: employeeData?.surname ?? '',
    phone: employeeData?.phone ?? '',
    email: employeeData?.email ?? '',
  };

  const btnClass = clsx(styles['p-insert-employee__button'], "l-grid__col l-grid__col--span-6");

  return (
    <div className={styles['p-insert-employee']}>
      <Card additionalClassName={styles["p-insert-employee__card-title"]}>
        <div className={styles["p-insert-employee__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-insert-employee__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.LIBEMAX_EMPLOYEES}><ChevronLeft /></LinkComponent>
        </div>
      </Card>

      {(!isEditMode || isFetchedEmployee) && <Card additionalClassName={clsx(styles['p-insert-employee'], "l-grid__col l-grid__col--span-12")}>
        <div className={styles["p-insert-employee__container"]}>
          {(error || editError) && <Typography>errore</Typography>}
          <Form<LibemaxEmployeeForm>
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
          {!isEditMode && <Switch
            onChange={res => setLockNavigate(!!res)}
            value={locNavigate}
            label={t('keepInPage')}
            additionalClassName={styles['p-insert-employee__keep-in-page']}
          />}
        </div>
      </Card>}
    </div>
  );
};

export default InsertEmployee;
