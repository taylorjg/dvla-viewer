import { orderFields } from "./orderFields";

describe("orderFields unit tests", () => {
  it("all known fields", () => {
    const vehicleDetails = {
      artEndDate: "Don't care",
      taxDueDate: "Don't care",
      taxStatus: "Don't care",
      registrationNumber: "Don't care",
    };
    const orderedVehicleDetails = orderFields(vehicleDetails);
    const actual = Object.keys(orderedVehicleDetails);
    expect(actual).toEqual([
      "registrationNumber",
      "taxStatus",
      "taxDueDate",
      "artEndDate",
    ]);
  });

  it("some unknown fields", () => {
    const vehicleDetails = {
      bogus1: "Don't care",
      artEndDate: "Don't care",
      taxDueDate: "Don't care",
      taxStatus: "Don't care",
      registrationNumber: "Don't care",
      bogus2: "Don't care",
    };
    const orderedVehicleDetails = orderFields(vehicleDetails);
    const actual = Object.keys(orderedVehicleDetails);
    expect(actual).toEqual([
      "registrationNumber",
      "taxStatus",
      "taxDueDate",
      "artEndDate",
      "bogus1",
      "bogus2",
    ]);
  });
});
