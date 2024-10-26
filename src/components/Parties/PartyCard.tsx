import { AttachMoney, Event, LocationOn, People } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { PartiesSchema } from "../../../@types/PartiesSchema";

export default function PartyCard({ party }: { party: PartiesSchema }) {
  const { organizer, size, budget, roles, date, location } = party;

  return (
    <Card elevation={2} sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {`Organized by: ${organizer}`}
        </Typography>
        <Stack spacing={1} sx={{ mt: 2 }}>
          <Stack direction="row" alignItems="center">
            <IconButton>
              <People />
            </IconButton>
            <Typography variant="body1">{`Size: ${size}`}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <IconButton>
              <AttachMoney />
            </IconButton>
            <Typography variant="body1">{`Budget: $${budget}`}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <IconButton>
              <LocationOn />
            </IconButton>
            <Typography variant="body1">{`Location: ${location}`}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <IconButton>
              <Event />
            </IconButton>
            <Typography variant="body1">{`Date: ${new Date(date).toLocaleDateString()}`}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <IconButton>
              <People />
            </IconButton>
            <Typography variant="body1">{`Roles: ${roles.join(", ")}`}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" sx={{ ml: 2 }}>
          Join
        </Button>
      </CardActions>
    </Card>
  );
}
