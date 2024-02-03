import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import * as changeCase from "change-case";

export const VehicleDetails = ({ vehicleDetails }) => {
  return (
    <Box sx={{ mt: 2, pb: 2 }}>
      <List disablePadding data-testid="vehicle-details">
        {Object.entries(vehicleDetails).map(([key, value]) => {
          const label = changeCase.capitalCase(key);

          return (
            <React.Fragment key={key}>
              <Divider />
              <ListItem disablePadding disableGutters>
                <ListItemText primary={label} secondary={value} />
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

VehicleDetails.propTypes = {
  vehicleDetails: PropTypes.object.isRequired,
};
