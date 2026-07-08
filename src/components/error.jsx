import PropTypes from "prop-types";
import { Alert } from "@mui/material";

export const Error = ({ error }) => {
  const detail = error.response?.data?.error;
  const errorMessage = detail ?? error.message;

  return (
    <Alert severity="error" variant="outlined">
      {errorMessage}
    </Alert>
  );
};

Error.propTypes = {
  error: PropTypes.object.isRequired,
};
