export type AvailableDomainsType = 'mail' | 'sms';
export type AvailableOutcomesType = 'ham' | 'spam';
export type AvailableGendersType = 'M' | 'F' | 'O';
export type AvailableRolesType = "admin" | "user";
export type AvailableStatusesType = "success" | "failure";
export type AvailableMailInsertType = 'file' | 'text';

export interface IMailFormData {
  from_name: string;
  from_mail: string;
  to: string;
  subject: string;
  is_html: boolean;
  body_text: string;
};

export interface ISMSFormData {
  text: string;
}