import PropTypes from "prop-types";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import * as changeCase from "change-case";

import { formatField } from "@app/helpers";

import { RegistrationPlate } from "./registration-plate";

export const VehicleDetailsTable = ({ vehicleDetails }) => {
  return (
    <Box sx={{ pb: 2 }}>
      <TableContainer data-testid="vehicle-details">
        <Table aria-label="Vehicle details">
          <TableBody>
            {Object.entries(vehicleDetails).map(([key, value]) => {
              const label = changeCase.capitalCase(key);

              const secondary =
                key === "registrationNumber" ? (
                  <RegistrationPlate registrationNumber={value} />
                ) : (
                  formatField(key, value)
                );

              return (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    <Typography component="span" variant="subtitle2">
                      {label}
                    </Typography>
                  </TableCell>
                  <TableCell>{secondary}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

VehicleDetailsTable.propTypes = {
  vehicleDetails: PropTypes.object.isRequired,
};
