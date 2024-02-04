import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import * as changeCase from "change-case";

import { formatField } from "@app/helpers";

import { RegistrationPlate } from "./RegistrationPlate";

export const VehicleDetailsList = ({ vehicleDetails }) => {
  return (
    <Box sx={{ mt: 2, pb: 2 }}>
      <List disablePadding data-testid="vehicle-details">
        {Object.entries(vehicleDetails).map(([key, value]) => {
          const label = changeCase.capitalCase(key);

          const secondary =
            key === "registrationNumber" ? (
              <RegistrationPlate registrationNumber={value} />
            ) : (
              formatField(key, value)
            );

          return (
            <React.Fragment key={key}>
              <Divider />
              <ListItem disablePadding disableGutters>
                <ListItemText primary={label} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

VehicleDetailsList.propTypes = {
  vehicleDetails: PropTypes.object.isRequired,
};
