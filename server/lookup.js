/* eslint-env node */

import axios from "axios";

import * as U from "./serverless-utils";

axios.defaults.baseURL = "https://driver-vehicle-licensing.api.gov.uk";
axios.defaults.headers.common["x-api-key"] = process.env.API_KEY;

export const handlerImpl = async (registrationNumber) => {
  const url = "/vehicle-enquiry/v1/vehicles";
  const data = { registrationNumber };
  const response = await axios.post(url, data);
  return {
    data: response.data,
  };
};

export const handler = async (event) => {
  return U.wrapHandlerImplementation("/api/lookup", async () => {
    const registrationNumber =
      event.queryStringParameters?.registrationNumber ?? "";
    console.info("registrationNumber:", registrationNumber);
    const result = await handlerImpl(registrationNumber);
    console.info("result:", result);
    return result;
  });
};
