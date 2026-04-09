import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { File, Mars, ShieldBan, ShieldCheck, Text, Transgender, Venus, type LucideIcon } from 'lucide-react';
import type { TFunction } from 'i18next';

export const OPTIONS_CONFIG = {
  gender: [
    { value: 'M', label: 'gender.male', Icon: Mars as LucideIcon },
    { value: 'F', label: 'gender.female', Icon: Venus as LucideIcon },
    { value: 'O', label: 'gender.other', Icon: Transgender as LucideIcon },
  ],
  mailInsert: [
    { value: 'file', label: 'mail_insert.file', Icon: File as LucideIcon  },
    { value: 'text', label: 'mail_insert.text', Icon: Text as LucideIcon  },
  ],
  domains: [
    { value: 'mail', label: 'domain.mail' },
    { value: 'sms', label: 'domain.sms' },
  ],
  outcomes: [
    { value: 'spam', label: 'outcome.spam', Icon: ShieldBan as LucideIcon  },
    { value: 'ham', label: 'outcome.ham', Icon: ShieldCheck as LucideIcon  },
  ],
};

type OptionGroup = keyof typeof OPTIONS_CONFIG;
export type OptionValue<T extends OptionGroup> =
  typeof OPTIONS_CONFIG[T][number]['value'];

export const buildOptions = <T extends OptionGroup>(
  t: TFunction,
  group: T
) => OPTIONS_CONFIG[group].map(opt => (
  { ...opt, label: t(opt.label) }
));

export const useOptions = () => {
  const { t } = useTranslation("constantOptions");

  return useMemo(() => ({
    gender: buildOptions<'gender'>(t, 'gender') as typeof OPTIONS_CONFIG.gender,
    mailInsert: buildOptions<'mailInsert'>(t, 'mailInsert') as typeof OPTIONS_CONFIG.mailInsert,
    domains: buildOptions<'domains'>(t, 'domains') as typeof OPTIONS_CONFIG.domains,
    outcomes: buildOptions<'outcomes'>(t, 'outcomes') as typeof OPTIONS_CONFIG.outcomes,
  }), [t]);
};