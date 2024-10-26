import { Euro } from "@mui/icons-material";
import { Avatar, Chip, InputAdornment, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { useState } from "react";
import { PartiesSchema } from "../../../@types/PartiesSchema";
import { User } from "../../../@types/User";

function LeftSide({ user, formik }: { user: User; formik: FormikProps<PartiesSchema> }) {
  const [newRole, setNewRole] = useState<string>("");
  return (
    <Stack direction="column" spacing={4}>
      <Chip
        avatar={<Avatar src={user.photo} />}
        color="secondary"
        variant="filled"
        label={`Organiser: ${user.name} (${user.id})`}
      />
      <TextField
        select
        fullWidth
        variant="outlined"
        label="Choose party size"
        value={formik.values.size}
        onChange={formik.handleChange}
        name="size"
        error={Boolean(formik.errors.size)}
        helperText={formik.errors.size}
      >
        <MenuItem value="small">Small</MenuItem>
        <MenuItem value="large">Large</MenuItem>
      </TextField>
      <TextField
        type="number"
        label="Budget"
        variant="outlined"
        required
        name="budget"
        value={formik.values.budget}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.budget)}
        helperText={formik.errors.budget}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Euro />
              </InputAdornment>
            ),
          },
        }}
      />
      <Typography variant="h6">Roles:</Typography>
      <Stack direction="column" spacing={2}>
        {formik.values.roles.length === 0 ? (
          <Typography variant="caption">No roles added</Typography>
        ) : (
          formik.values.roles.map((role) => <Chip key={role} color="secondary" variant="filled" label={role} />)
        )}
      </Stack>
      <TextField
        type="text"
        label="Add role"
        variant="outlined"
        required
        name="newRole"
        value={newRole}
        onChange={(event) => setNewRole(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            formik.setFieldValue("roles", [...formik.values.roles, newRole]);
            setNewRole("");
          }
        }}
      />
      <TextField
        type="date"
        label="Specify date"
        variant="outlined"
        required
        name="date"
        value={formik.values.date}
        onChange={formik.handleChange}
      />
      <TextField
        type="text"
        label="Specify location"
        variant="outlined"
        required
        name="location"
        value={formik.values.location}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.location)}
        helperText={formik.errors.location}
      />
    </Stack>
  );
}

export default LeftSide;
