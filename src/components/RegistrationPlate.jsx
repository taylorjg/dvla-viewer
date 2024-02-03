import PropTypes from "prop-types";

import { formatRegistration } from "@app/formatRegistration";

import { StyledRegistrationPlate } from "./RegistrationPlate.styles";

export const RegistrationPlate = ({ registrationNumber }) => {
  return (
    <StyledRegistrationPlate>
      {formatRegistration(registrationNumber)}
    </StyledRegistrationPlate>
  );
};

RegistrationPlate.propTypes = {
  registrationNumber: PropTypes.string.isRequired,
};
