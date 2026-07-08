import { partition } from "./utils";

// https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/vehicle-enquiry-service/v1.2.0-vehicle-enquiry-service.html#schemas-properties-3
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
  const sortOrderMap = new Map(
    ORDERED_FIELDS.map((field, index) => [field, index])
  );
  const kvps = Object.entries(vehicleDetails);
  const [kvpsInMap, kvpsNotInMap] = partition(kvps, ([field]) =>
    sortOrderMap.has(field)
  );
  const sortedKvpsInMap = kvpsInMap.sort((kvpA, kvpB) => {
    const [fieldA] = kvpA;
    const [fieldB] = kvpB;
    const sortOrderA = sortOrderMap.get(fieldA);
    const sortOrderB = sortOrderMap.get(fieldB);
    return sortOrderA - sortOrderB;
  });
  const combinedKvps = [...sortedKvpsInMap, ...kvpsNotInMap];
  return Object.fromEntries(combinedKvps);
};
