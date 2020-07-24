export const toMoney = (value) => {
  if (!value || isNaN(value)) return value;
  let formatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL',
  });
  return formatter.format(value);
};

export const padLeft = (nr, n, str) => {
  if (!nr) return nr;
  return Array(n - String(nr).length + 1).join(str || '0') + nr;
};

export const validateDate = (stringDate) => {
  return /\d{4}-\d{2}-\d{2}/.test(stringDate);
};
export const getDay = (stringDate) => {
  if (!stringDate || !validateDate(stringDate)) return null;
  return stringDate.split('-')[2];
};
export const getMonth = (stringDate) => {
  if (!stringDate || !validateDate(stringDate)) return null;
  return stringDate.split('-')[1];
};
export const getYear = (stringDate) => {
  if (!stringDate || !validateDate(stringDate)) return null;
  return stringDate.split('-')[0];
};
export const getYearMonth = (stringDate) => {
  return `${getYear(stringDate)}-${getMonth(stringDate)}`;
};
export const convertMonthYear = (monthYear) => {
  if (!monthYear) return null;
  const splited = monthYear.split('-');
  const resultado = `${monthToLiteral(splited[1])}/${splited[0]}`;
  return resultado;
};
export const monthToLiteral = (month) => {
  if (!month) return month;
  const number = parseInt(month, 10);
  if (number < 1 || number > 12) return number;
  const meses = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  return meses[number - 1];
};

export const removerAcentos = (value) => {
  return value.normalize('NFD').replace(/[^a-zA-Zs]/g, '');
};
