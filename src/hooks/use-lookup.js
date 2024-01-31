import { useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL =
  "https://jen123ryri.execute-api.us-east-1.amazonaws.com";

const lookup = async (registrationNumber) => {
  const config = {
    params: {
      registrationNumber,
    },
  };
  const response = await axios.get("/api/lookup", config);
  return response.data;
};

export const useLookup = (registrationNumber) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["lookup", registrationNumber],
    queryFn: () => lookup(registrationNumber),
    enabled: Boolean(registrationNumber),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
