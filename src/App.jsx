import { useState } from "react";
import { Button, Container, LinearProgress, TextField } from "@mui/material";

import { useLookup } from "@app/hooks";
import { Error, VehicleDetails, Version } from "@app/components";

import { StyledForm, StyledButtons } from "./App.styles";

export const App = () => {
  const [value, setValue] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const { data, isLoading, isError, error } = useLookup(registrationNumber);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setRegistrationNumber(value);
  };

  const onReset = () => {
    setValue("");
    setRegistrationNumber("");
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
        <StyledButtons>
          <Button size="small" variant="outlined" type="submit">
            Lookup
          </Button>
          <Button
            size="small"
            variant="outlined"
            type="button"
            onClick={onReset}
            color="error"
            disabled={!registrationNumber || isLoading}
          >
            Reset
          </Button>
        </StyledButtons>
        {isLoading && <LinearProgress sx={{ width: "100%" }} />}
        {isError && <Error error={error} />}
      </StyledForm>
      {data && <VehicleDetails vehicleDetails={data.data} />}
      <Version />
    </Container>
  );
};
