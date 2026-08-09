import { StyledVersion } from "./version.styles";

import packageJson from "../../package.json";

export const Version = () => {
  return (
    <StyledVersion component="footer" aria-label="Application version">
      version: {packageJson.version}
    </StyledVersion>
  );
};
