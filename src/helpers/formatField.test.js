import { formatField } from "./formatField";

describe("formatField unit tests", () => {
  it("bool true", () => {
    const actual = formatField("markedForExport", true);
    expect(actual).toBe("Yes");
  });

  it("bool false", () => {
    const actual = formatField("markedForExport", false);
    expect(actual).toBe("No");
  });

  it("date day month year", () => {
    const actual = formatField("taxDueDate", "2024-08-01");
    expect(actual).toBe("1 August 2024");
  });

  it("date month year", () => {
    const actual = formatField("monthOfFirstRegistration", "2018-04");
    expect(actual).toBe("April 2018");
  });

  it("cc", () => {
    const actual = formatField("engineCapacity", "1395");
    expect(actual).toBe("1395 cc");
  });

  it("g/km", () => {
    const actual = formatField("co2Emissions", "119");
    expect(actual).toBe("119 g/km");
  });

  it("kg", () => {
    const actual = formatField("revenueWeight", "1625");
    expect(actual).toBe("1625 kg");
  });
});
