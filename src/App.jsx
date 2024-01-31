import { useState } from "react";
import { Button, Container, LinearProgress, TextField } from "@mui/material";

import { useLookup } from "@app/hooks";
import { Error } from "@app/components";

import { StyledForm } from "./App.styles";

export const App = () => {
  const [value, setValue] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const { data, isLoading, isError, error } = useLookup(registrationNumber);

  console.log({ data, isLoading, isError, error });

  const onChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setRegistrationNumber(value);
  };

  return (
    <Container sx={{ mt: 2 }}>
      <StyledForm onSubmit={onSubmit}>
        <TextField
          size="small"
          label="Registration Number"
          value={value}
          onChange={onChange}
        />
        <Button size="small" variant="outlined" type="submit">
          Lookup
        </Button>
        {isLoading && <LinearProgress sx={{ width: "100%" }} />}
        {isError && <Error error={error} />}
      </StyledForm>
    </Container>
  );
};
