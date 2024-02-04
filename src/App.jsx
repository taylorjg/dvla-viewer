import { useState } from "react";
import {
  Button,
  Container,
  Grid,
  LinearProgress,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { useLookup } from "@app/hooks";
import {
  Error,
  VehicleDetailsList,
  VehicleDetailsTable,
  Version,
} from "@app/components";
import { orderFields } from "@app/helpers";

import { StyledForm, StyledButtons } from "./App.styles";

export const App = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
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

  const VehicleDetailsComponent = isXs
    ? VehicleDetailsList
    : VehicleDetailsTable;

  const vehicleDetails = data ? orderFields(data.data) : {};

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ mx: { xs: 2, md: "auto" } }}>
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
          {data && <VehicleDetailsComponent vehicleDetails={vehicleDetails} />}
        </Grid>
      </Grid>
      <Version />
    </Container>
  );
};
