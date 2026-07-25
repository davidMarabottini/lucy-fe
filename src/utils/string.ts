export const setRequiredField = (text: string, required?: boolean) => required ? `${text} *` : text;
export const getInitials = (strings: string[]) => strings.reduce((acc, str) => acc + str[0], "").toUpperCase();
