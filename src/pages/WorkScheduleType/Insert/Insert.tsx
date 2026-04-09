import Card from '@components/atoms/Card/Card';
import styles from "./Insert.module.scss";
import { useTranslation } from 'react-i18next';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import Typography from '@components/atoms/Typography/Typography';
import { Check, ChevronLeft, X } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';

import { useInsertWorkScheduleType } from '@/hooks/api/WorkScheduleTypeHooks';
import { type WorkScheduleTypePayload } from '@/api/workScheduleTypeService';
import Switch from '@/components/atoms/Switch/Switch';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import * as LucideIcons from 'lucide-react';

const InsertWorkScheduleType = () => {
  const [locNavigate, setLockNavigate] = useState<boolean>(false)
  const { t } = useTranslation('workScheduleType', { keyPrefix: 'insert' });
  const { mutate: insertType } = useInsertWorkScheduleType(locNavigate);

  const iconOptions = Object.keys(LucideIcons)
    .filter((key) => key !== 'createLucideIcon') // Filtra utility interne
    .map((name) => ({
      label: name,
      value: name,
      Icon: name,
    })
  );

  const onSubmit = (values: any, methods: UseFormReturn<any>) => {
    const payload: WorkScheduleTypePayload = {
      name: values.name,
      description: values.description,
      frequency: values.frequency ? Number(values.frequency) : undefined,
      period: values.period,
      icon_name: values.icon_name || 'Clock',
    };

    insertType(payload);

    methods.reset();
  };

  // Opzioni per il periodo (coerenti con l'Enum del backend)
  const periodOptions = [
    { value: 'NONE', label: t('form.period.options.none') },
    { value: 'DAY', label: t('form.period.options.day') },
    { value: 'WEEK', label: t('form.period.options.week') },
    { value: 'MONTH', label: t('form.period.options.month') },
    { value: 'YEAR', label: t('form.period.options.year') },
    { value: 'FIXED', label: t('form.period.options.fixed') },
  ];

  return (
    <div className={styles['p-insert-wst']}>
      <Card additionalClassName={styles["p-insert-wst__card-title"]}>
        <div className={styles["p-insert-wst__card-title-internal"]}>
          <Typography variant="h2">{t("title")}</Typography>
          <LinkComponent to={ROUTES.WORK_SCHEDULE_TYPE_LIST}><ChevronLeft /></LinkComponent>
        </div>
      </Card>

      <Card>
        <Form 
          onSubmit={onSubmit} 
          defaultValues={{ 
            name: '', 
            description: '', 
            frequency: 1, 
            period: 'NONE', 
            icon_name: 'Clock' 
          }}
        >
          <Stack spacing='lg'>
            <div className="l-grid">
              
              {/* Nome Tipologia */}
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="name"
                label={t('form.name.label')}
                rules={{ required: t('form.name.required') }}
              />

              {/* Icona (Stringa per ora, o un Select di nomi icone) */}
              <Form.Select
                className="l-grid__col l-grid__col--span-6"
                name="icon_name"
                label={t('form.icon_name.label')}
                options={iconOptions}
                // placeholder="es: Clock, Zap, Home..."
              />

              {/* Periodo (Select) */}
              <Form.Select
                className="l-grid__col l-grid__col--span-6"
                name="period"
                label={t('form.period.label')}
                options={periodOptions}
              />

              {/* Frequenza */}
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="frequency"
                type="number"
                label={t('form.frequency.label')}
                rules={{ min: { value: 1, message: t('form.frequency.minError') } }}
              />

              <Form.TextArea
                className="l-grid__col l-grid__col--span-12"
                name="description"
                label={t('form.description.label')}
                rows={3}
              />

              {/* Azioni */}
              <div className="l-grid__col l-grid__col--span-12 l-grid l-grid--inner u-margin-top-md">
                <Form.Button type="submit" className="l-grid__col l-grid__col--span-6">
                  <Check size={16} /> {t("submit")}
                </Form.Button>
                <Form.Button type="reset" color='secondary' className="l-grid__col l-grid__col--span-6">
                  <X size={16} /> {t("reset")}
                </Form.Button>
              </div>

            </div>
          </Stack>
        </Form>
          <Switch
            onChange={res => setLockNavigate(!!res)}
            value={locNavigate}
            label={t('keepInPage')}
            additionalClassName={styles['p-insert-client__keep-in-page']}
          />
      </Card>
    </div>
  );
};

export default InsertWorkScheduleType;