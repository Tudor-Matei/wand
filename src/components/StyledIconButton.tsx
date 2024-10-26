import { IconButton, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: "1px solid",
  borderColor: grey[800],
  borderRadius: 12,
  p: 1,
  "& svg": { color: theme.palette.primary.main, fontSize: 20 },
}));

export default StyledIconButton;
