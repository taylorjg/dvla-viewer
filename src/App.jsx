import { useLookup } from "@app/hooks";

export const App = () => {
  const { data, isLoading, isError, error } = useLookup();

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    const detail = error.response?.data?.error;
    const errorMessage = detail ?? error.message;
    return <div>Error: {errorMessage}</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
