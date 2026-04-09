type Validator = (value: unknown) => boolean;

const commonValidation: Validator = (value) => value === null || value === undefined;

const typeValidators: Record<string, Validator> = {
  string: (value) => commonValidation(value) || value === '',
  number: (value) => commonValidation(value) || Number.isNaN(value),
  boolean: commonValidation,
  object: (value) => commonValidation(value) || (Array.isArray(value) && value.length === 0),
};

export const isNullable = <T>(value: T): boolean => {
  const validator = typeValidators[typeof value] || commonValidation;
  return validator(value);
};