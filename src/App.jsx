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

export const App = () => {
  const registrationNumber = "WV18UXA";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["lookup", registrationNumber],
    queryFn: () => lookup(registrationNumber),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    const detail = error.response?.data?.error;
    const errorMessage = detail ?? error.message;
    return <div>Error: {errorMessage}</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
