import { AutoFixNormalTwoTone, LogoutOutlined } from "@mui/icons-material";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import StyledIconButton from "./StyledIconButton";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user !== null) return;
    fetch("/api/user")
      .then((r) => r.json())
      .then((r) => {
        if (!r.err) {
          setUser(r.data);
        }
      });
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderBottomColor: "primary.main",
      }}
    >
      <Toolbar>
        <AutoFixNormalTwoTone color="primary" fontSize="large" sx={{ mr: 2 }} />
        <Typography variant="subtitle2" sx={{ color: "text.secondary", flexGrow: 1 }}>
          Wand
        </Typography>

        <Stack direction="row" spacing={2}>
          {user !== null && (
            <StyledIconButton
              size="small"
              onClick={() => {
                fetch("/api/logout")
                  .then((r) => r.json())
                  .then((r) => {
                    if (!r.err) setUser(null);
                  });
              }}
            >
              <LogoutOutlined />
            </StyledIconButton>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
