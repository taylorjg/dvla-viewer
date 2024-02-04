// https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/vehicle-enquiry-service/v1.2.0-vehicle-enquiry-service.html#schemas-properties-3

import { partition } from "./utils";

const ORDERED_FIELDS = [
  "registrationNumber",
  "taxStatus",
  "taxDueDate",
  "artEndDate",
  "motStatus",
  "motExpiryDate",
  "make",
  "colour",
  "yearOfManufacture",
  "monthOfFirstDvlaRegistration",
  "monthOfFirstRegistration",
  "dateOfLastV5CIssued",
  "fuelType",
  "engineCapacity",
  "co2Emissions",
  "revenueWeight",
  "wheelplan",
  "automatedVehicle",
  "markedForExport",
  "typeApproval",
  "realDrivingEmissions",
  "euroStatus",
];

export const orderFields = (vehicleDetails) => {
  const map = new Map(ORDERED_FIELDS.map((field, index) => [field, index]));
  const kvps = Object.entries(vehicleDetails);
  const [kvps1, kvps2] = partition(kvps, ([key]) =>
    ORDERED_FIELDS.includes(key)
  );
  const sortedKvps1 = kvps1.sort((a, b) => {
    const [keyA] = a;
    const [keyB] = b;
    const sortOrderA = map.get(keyA);
    const sortOrderB = map.get(keyB);
    return sortOrderA - sortOrderB;
  });
  const allKvps = [...sortedKvps1, ...kvps2];
  return Object.fromEntries(allKvps);
};
