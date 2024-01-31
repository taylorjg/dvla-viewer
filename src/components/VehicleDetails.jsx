import PropTypes from "prop-types";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import * as changeCase from "change-case";

export const VehicleDetails = ({ vehicleDetails }) => {
  return (
    <List disablePadding>
      {Object.entries(vehicleDetails).map(([key, value], index) => {
        const label = changeCase.capitalCase(key);

        return (
          <>
            {index > 0 && <Divider />}
            <ListItem key={key} disablePadding disableGutters>
              <ListItemText primary={label} secondary={value} />
            </ListItem>
          </>
        );
      })}
    </List>
  );
};

VehicleDetails.propTypes = {
  vehicleDetails: PropTypes.object.isRequired,
};
