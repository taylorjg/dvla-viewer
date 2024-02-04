const formatDay = (d) => {
  return parseInt(d, 10);
};

const formatMonth = (m) => {
  switch (Number(m)) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "?";
  }
};

// 2024-08-01 => 1 August 2024
const formatDateDayMonthYear = (value) => {
  const y = value.slice(0, 4);
  const m = value.slice(5, 7);
  const d = value.slice(8, 10);
  return `${formatDay(d)} ${formatMonth(m)} ${y}`;
};

// 2018-04 => April 2018
const formatDateMonthYear = (value) => {
  const y = value.slice(0, 4);
  const m = value.slice(5, 7);
  return `${formatMonth(m)} ${y}`;
};

const formatBool = (value) => {
  return value ? "Yes" : "No";
};

const formatCc = (value) => {
  return `${value} cc`;
};

const formatGramPerKm = (value) => {
  return `${value} g/km`;
};

const formatKg = (value) => {
  return `${value} kg`;
};

const formatString = (value) => {
  return value.toString();
};

const FIELD_FORMATTERS = new Map([
  ["taxDueDate", formatDateDayMonthYear],
  ["engineCapacity", formatCc],
  ["co2Emissions", formatGramPerKm],
  ["markedForExport", formatBool],
  ["revenueWeight", formatKg],
  ["dateOfLastV5CIssued", formatDateDayMonthYear],
  ["motExpiryDate", formatDateDayMonthYear],
  ["monthOfFirstRegistration", formatDateMonthYear],
]);

export const formatField = (key, value) => {
  const formatter = FIELD_FORMATTERS.get(key) ?? formatString;
  return formatter(value);
};
