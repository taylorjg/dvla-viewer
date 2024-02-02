import axios from "axios";
import packageJson from "./package.json";

export const makeResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};

export const makeErrorResponse = (statusCode, errorMessage) => {
  return makeResponse(statusCode, { error: errorMessage });
};

// https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/vehicle-enquiry-service/vehicle-enquiry-service-description.html#test-environment-response
export const extractErrorMessage = (error) => {
  const errors = error.response?.data?.errors;
  if (Array.isArray(errors) && errors.length > 0) {
    return errors[0].detail;
  }
  return error.message;
};

export const wrapHandlerImplementation = async (
  endpointName,
  handlerImplementation
) => {
  try {
    console.info(
      "endpointName:",
      endpointName,
      "version:",
      packageJson.version
    );

    let specialResponse = undefined;
    const makeSpecialResponse = (statusCode, error) => {
      console.error("[makeSpecialResponse]", error);
      specialResponse = makeErrorResponse(statusCode, error);
    };

    const result = await handlerImplementation(makeSpecialResponse);
    return specialResponse ?? makeResponse(200, result);
  } catch (error) {
    console.log("Caught error:", error.message);
    if (axios.isAxiosError(error)) {
      const statusCode = error.response.status;
      const errorMessage = extractErrorMessage(error);
      return makeErrorResponse(statusCode, errorMessage);
    }
    return makeErrorResponse(500, error.message);
  }
};
