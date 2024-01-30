import { useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL =
  "https://jen123ryri.execute-api.us-east-1.amazonaws.com";

const lookupCarReg = async () => {
  const config = {
    params: {
      registrationNumber: "WV18UXA",
    },
  };
  const response = await axios.get("/api/lookup", config);
  return response.data;
};

export const App = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dvla"],
    queryFn: lookupCarReg,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error}</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
