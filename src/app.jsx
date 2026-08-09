import { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Grid,
  LinearProgress,
  TextField,
  Typography,
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
import { formatVehicleDetailsSummary, orderFields } from "@app/helpers";

import {
  StyledAppShell,
  StyledForm,
  StyledButtons,
  StyledVisuallyHidden,
} from "./app.styles";

export const App = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [resultsAnnouncement, setResultsAnnouncement] = useState("");
  const resultsRef = useRef(null);
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

  useEffect(() => {
    if (!data) {
      return;
    }

    const summary = formatVehicleDetailsSummary(orderFields(data.data));
    const announcementTimeoutId = window.setTimeout(() => {
      setResultsAnnouncement(summary);
    }, 100);

    resultsRef.current?.focus();

    return () => window.clearTimeout(announcementTimeoutId);
  }, [data]);

  return (
    <StyledAppShell>
      <Container component="main" sx={{ flex: 1, mt: 2 }}>
        <Grid container>
          <Grid size={{ xs: 12, md: 6 }} sx={{ mx: { xs: 2, md: "auto" } }}>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              DVLA Viewer
            </Typography>
            <StyledForm onSubmit={onSubmit} aria-label="Vehicle lookup">
              <TextField
                size="small"
                variant="standard"
                autoComplete="off"
                autoFocus // eslint-disable-line jsx-a11y-x/no-autofocus -- sole primary input on a single-purpose lookup page
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
              {isLoading && (
                <LinearProgress sx={{ width: "100%" }} aria-label="Loading" />
              )}
              <div aria-live="polite" aria-atomic="true">
                {isError && <Error error={error} />}
              </div>
            </StyledForm>
            <StyledVisuallyHidden
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {data ? resultsAnnouncement : ""}
            </StyledVisuallyHidden>
            {data && (
              <section
                ref={resultsRef}
                tabIndex={0} // eslint-disable-line jsx-a11y-x/no-noninteractive-tabindex -- keyboard entry point for results after lookup
                aria-labelledby="vehicle-details-heading"
              >
                <Typography
                  component="h2"
                  variant="h6"
                  id="vehicle-details-heading"
                  sx={{ mt: 2, mb: 1 }}
                >
                  Vehicle details
                </Typography>
                <VehicleDetailsComponent vehicleDetails={vehicleDetails} />
              </section>
            )}
          </Grid>
        </Grid>
      </Container>
      <Version />
    </StyledAppShell>
  );
};
