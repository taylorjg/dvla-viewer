import React from "react";
import PropTypes from "prop-types";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import * as changeCase from "change-case";

export const VehicleDetails = ({ vehicleDetails }) => {
  return (
    <List disablePadding>
      {Object.entries(vehicleDetails).map(([key, value], index) => {
        const label = changeCase.capitalCase(key);

        return (
          <React.Fragment key={key}>
            {index > 0 && <Divider />}
            <ListItem disablePadding disableGutters>
              <ListItemText primary={label} secondary={value} />
            </ListItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};

VehicleDetails.propTypes = {
  vehicleDetails: PropTypes.object.isRequired,
};
