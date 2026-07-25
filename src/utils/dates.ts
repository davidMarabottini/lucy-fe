export const formatDate = (dateStr: string, format: string = "it-IT") => new Date(dateStr).toLocaleDateString(format);
