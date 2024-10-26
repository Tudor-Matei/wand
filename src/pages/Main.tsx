import { Add, Visibility } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

export default function Main() {
  const { user } = useContext(UserContext);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: "100%",
        height: "100vh",
        overflowX: "clip",
      }}
    >
      <Box sx={{ ml: 4, width: "100%", zIndex: 2, position: "relative" }}>
        <Typography variant="h2" textTransform="uppercase" fontWeight={900} color="primary">
          Party like never before
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          And organize it right, because being a student is one of the most amazing parts of life. And you should profit
          from it.
        </Typography>

        <Link to={!user ? "/signin" : "/create"}>
          <Button sx={{ maxWidth: "fit-content" }} variant="contained" startIcon={<Add />}>
            Create a new party
          </Button>
        </Link>

        {user !== null && (
          <Link to="/parties">
            <Button sx={{ ml: 2, maxWidth: "fit-content" }} variant="contained" startIcon={<Visibility />}>
              Show parties
            </Button>
          </Link>
        )}
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          "&::before": {
            position: "absolute",
            content: "''",
            inset: 0,
            left: "-10%",
            zIndex: 0,
            width: "120%",
            height: "100%",
            background: "url('/src/images/party.jpg') center center no-repeat",
            backgroundSize: "cover",
            borderTopLeftRadius: "50%",
          },
          "&::after": {
            position: "absolute",
            content: "''",
            inset: 0,
            left: "-10%",
            zIndex: 1,
            width: "120%",
            height: "100%",
            backgroundColor: "var(--mui-palette-primary-dark)",
            opacity: 0.25,
            borderTopLeftRadius: "50%",
          },
        }}
      ></Box>
    </Stack>
  );
}
