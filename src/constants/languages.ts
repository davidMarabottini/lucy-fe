import ISO6391 from 'iso-639-1';

export const LANGUAGES = ISO6391.getAllCodes()
  .map(code => ({
    value: code,
    label: ISO6391.getNativeName(code) || ISO6391.getName(code),
  }))
  .sort((a, b) => a.label.localeCompare(b.label));