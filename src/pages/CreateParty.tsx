import { Alert, Box, Button, Container, Grid2, Snackbar, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import type { PartiesSchema } from "../../@types/PartiesSchema";
import { UserContext } from "../App";
import LeftSide from "../components/CreateParty/LeftSide";
import RightSide from "../components/CreateParty/RightSide";
import Offset from "../components/Offset";

export default function CreateParty() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const formikParties = useFormik<PartiesSchema>({
    initialValues: {
      id: 0,
      organizer: "",
      size: "",
      budget: 0,
      roles: [],
      date: "0",
      location: "",
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors: Partial<{ [k in keyof PartiesSchema]: string }> = {};

      if (values.size !== "small" && values.size !== "large") {
        errors.size = "Invalid size specified.";
      }

      if (values.budget <= 0) {
        errors.budget = "Budget must be greater than zero.";
      }

      if (values.roles.length === 0) {
        errors.roles = "At least one role must be selected.";
      }

      if (values.date === "0") {
        errors.date = "Invalid date specified.";
      }

      if (values.location.length === 0) {
        errors.location = "Location is required.";
      }

      return errors;
    },

    onSubmit: (values) => {
      fetch("/api/create-party", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.err) {
            alert(r.err);
            formikParties.resetForm();
            return;
          } else {
            setOpen(true);
          }

          // TODO: redirect to /party/:r.data.id
        });
    },
  });

  if (user === null)
    return (
      <>
        <Offset multiplier={4} />
        <Typography variant="h2">You're not authenticated, you cannot create parties.</Typography>
      </>
    );

  return (
    <Container maxWidth="lg">
      <Offset multiplier={2} />
      <Stack
        component="form"
        method="POST"
        onSubmit={formikParties.handleSubmit}
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography variant="h3" fontWeight="bold">
          Create a new party
        </Typography>
        <Box>
          <Button type="submit" sx={{ mr: 2 }} variant="contained" color="secondary">
            Submit
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={() => {
              formikParties.resetForm();
              navigate("/");
            }}
          >
            Cancel
          </Button>
        </Box>
      </Stack>
      <Grid2 container spacing={4}>
        <Grid2 size={6}>
          <LeftSide user={user} formik={formikParties} />
        </Grid2>
        <Grid2 size={6}>
          <RightSide />
        </Grid2>
      </Grid2>

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
          The party has been successfully added to the database.
        </Alert>
      </Snackbar>
    </Container>
  );
}
