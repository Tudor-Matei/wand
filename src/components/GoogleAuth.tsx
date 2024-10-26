import { Box, Button, Card, CardContent, Container, Divider, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../App";
import Offset from "./Offset";

export default function GoogleAuthComponent() {
  const { user } = useContext(UserContext);
  if (user !== null)
    return (
      <>
        <Offset multiplier={2} />
        <Typography textAlign="center" variant="h2">
          You're already authenticated, {user.name}
        </Typography>
      </>
    );

  return (
    <Container
      sx={{
        width: "100%",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          right: "30vw",
          zIndex: 0,
          top: 0,
          width: 100,
          height: "100%",
          bgcolor: "var(--mui-palette-secondary-light)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          zIndex: 0,
          top: "30vh",
          height: 100,
          width: "100vw",
          bgcolor: "var(--mui-palette-primary-dark)",
        },
      }}
    >
      <Card elevation={5} sx={{ position: "relative", zIndex: 1, height: "fit-content", p: 8 }}>
        <CardContent>
          <Stack direction="column" spacing={4}>
            <Box>
              <Typography gutterBottom variant="h5" fontWeight="bold">
                Sign in to Wand easily
              </Typography>
              <Typography variant="subtitle1">And start your party organizing journey.</Typography>
            </Box>
            <Divider />
            <Button variant="contained" href="/api/login">
              Sign in with Google
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
