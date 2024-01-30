/* eslint-env node */

import axios from "axios";

axios.defaults.baseURL = "https://driver-vehicle-licensing.api.gov.uk";
axios.defaults.headers.common["x-api-key"] = process.env.API_KEY;

export const handler = async (event) => {
  try {
    const registrationNumber =
      event.queryStringParameters?.registrationNumber ?? "";

    const url = "/vehicle-enquiry/v1/vehicles";
    const data = { registrationNumber };

    const response = await axios.post(url, data);

    return {
      data: response.data,
    };
  } catch (error) {
    return {
      errorMessage: error.message,
    };
  }
};
