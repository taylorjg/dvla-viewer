// https://www.nationalnumbers.co.uk/number-plate-formats-explained.htm

// Dateless - 1903 to 1963
// Dateless reg come in various configurations, either with 1, 2, 3 or 4 digits
// followed by 1, 2 or 3 letters, or the reverse with 1, 2 or 3 letters
// followed by 1, 2, 3 or 4 digits. The letters in the registration would originally
// have been able to identify the area of the country in which the registration was issued.
const datelessStyle = (m) => {
  const parts = [m[1], m[2], m[3], m[4]];
  return parts.filter(Boolean).join(" ");
};

// Suffix - 1963 to 1983
// Suffix registrations are those which follow the format of three letters,
// a number which can be 1, 2 or 3 digits in length, and finally a single year
// identifying letter.
const suffixStyle = (m) => {
  const letters = m[1];
  const numbers = m[2];
  const letter = m[3];
  return `${letters} ${numbers}${letter}`;
};

// Prefix - 1983 to 2001
// Prefix registrations are those which follow the format of a single year
// identifying letter, then a number (which can be 1, 2 or 3 digits in length),
// and then finally three more letters.
const prefixStyle = (m) => {
  const letter = m[1];
  const numbers = m[2];
  const letters = m[3];
  return `${letter}${numbers} ${letters}`;
};

// New Style - 2001 onwards
// These registrations are those which you will currently find on newly
// registered vehicles. They follow the format of a two letter prefix,
// followed by a two digit year identifier and finally three more letters.
const newStyle = (m) => {
  const letters1 = m[1];
  const numbers = m[2];
  const letters2 = m[3];
  return `${letters1}${numbers} ${letters2}`;
};

const FORMATTERS = [
  {
    regex: /^([0-9]{1,4})([A-Z]{1,3})$|^([A-Z]{1,3})([0-9]{1,4})$/,
    formatter: datelessStyle,
  },
  {
    regex: /^([A-Z]{3})([0-9]{1,3})([A-Z]{1})$/,
    formatter: suffixStyle,
  },
  {
    regex: /^([A-Z]{1})([0-9]{1,3})([A-Z]{3})$/,
    formatter: prefixStyle,
  },
  {
    regex: /^([A-Z]{2})([0-9]{2})([A-Z]{3})$/,
    formatter: newStyle,
  },
];

export const formatRegistration = (registrationNumber = "") => {
  const cleaned = registrationNumber
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  for (const { regex, formatter } of FORMATTERS) {
    const m = cleaned.match(regex);
    if (m) return formatter(m);
  }

  return cleaned;
};
