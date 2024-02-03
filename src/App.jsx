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
    setValue(event.target.value.toUpperCase());
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setRegistrationNumber(value);
  };

  const onReset = () => {
    setValue("");
    setRegistrationNumber("");
  };

  const isValueLockedIn = Boolean(registrationNumber);

  return (
    <Container sx={{ mt: 2 }}>
      <StyledForm onSubmit={onSubmit}>
        <TextField
          size="small"
          variant="standard"
          autoComplete="off"
          label="Registration Number"
          value={value}
          onChange={onChange}
          disabled={isValueLockedIn}
        />
        <StyledButtons>
          <Button
            size="small"
            variant="outlined"
            type="submit"
            disabled={!value || isValueLockedIn}
          >
            Lookup
          </Button>
          <Button
            size="small"
            variant="outlined"
            type="button"
            onClick={onReset}
            color="error"
            disabled={!isValueLockedIn || isLoading}
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
