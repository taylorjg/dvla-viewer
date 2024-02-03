import { formatRegistration } from "./formatRegistration";

describe("formatRegistration unit tests", () => {
  it.each([
    { registrationNumber: "MC20FLY", expected: "MC20 FLY" },
    { registrationNumber: "MA22ATT", expected: "MA22 ATT" },
    { registrationNumber: "MR03TOY", expected: "MR03 TOY" },
    { registrationNumber: "WW11TOP", expected: "WW11 TOP" },
  ])(
    "new style: $registrationNumber => $expected",
    ({ registrationNumber, expected }) => {
      const actual = formatRegistration(registrationNumber);
      expect(actual).toBe(expected);
    }
  );

  it.each([
    { registrationNumber: "K50WTB", expected: "K50 WTB" },
    { registrationNumber: "B22MJD", expected: "B22 MJD" },
    { registrationNumber: "X222JNC", expected: "X222 JNC" },
    { registrationNumber: "W3SND", expected: "W3 SND" },
  ])(
    "prefix style: $registrationNumber => $expected",
    ({ registrationNumber, expected }) => {
      const actual = formatRegistration(registrationNumber);
      expect(actual).toBe(expected);
    }
  );

  it.each([
    { registrationNumber: "FVL144M", expected: "FVL 144M" },
    { registrationNumber: "COL44K", expected: "COL 44K" },
    { registrationNumber: "MAS600D", expected: "MAS 600D" },
  ])(
    "suffix style: $registrationNumber => $expected",
    ({ registrationNumber, expected }) => {
      const actual = formatRegistration(registrationNumber);
      expect(actual).toBe(expected);
    }
  );

  it.each([
    { registrationNumber: "2TPO", expected: "2 TPO" },
    { registrationNumber: "6NAJ", expected: "6 NAJ" },
    { registrationNumber: "CB26", expected: "CB 26" },
    { registrationNumber: "SHB4", expected: "SHB 4" },
  ])(
    "dateless style: $registrationNumber => $expected",
    ({ registrationNumber, expected }) => {
      const actual = formatRegistration(registrationNumber);
      expect(actual).toBe(expected);
    }
  );
});
