import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IconButton, Tooltip } from "@mui/material";

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const actionsContainerStyle = css`
  display: flex;
  justify-content: space-between;
`;

export const StyledIconButton = styled(IconButton)`
  margin: 0 4px;
`;

export const StyledTooltip = styled(Tooltip)`
  margin: 0 4px;
`;

export const dataGridStyle = css`
  height: 400px;
  width: 100%;
`; // <-- Make sure this is defined and exported
