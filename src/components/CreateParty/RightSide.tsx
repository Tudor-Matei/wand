import { Cancel } from "@mui/icons-material";
import { Chip, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function RightSide() {
  const [newFriend, setNewFriend] = useState("");
  const [helperText, setHelperText] = useState("Enter their names");
  const [friends, setFriends] = useState<string[]>([]);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Friends:
      </Typography>

      <Stack direction="column" spacing={4}>
        <TextField
          type="text"
          label="Add friend"
          helperText={helperText}
          variant="outlined"
          required
          value={newFriend}
          onChange={(event) => setNewFriend(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && newFriend.length > 6) {
              setFriends((prev) => [...prev, newFriend]);
              setNewFriend("");
              setHelperText("Enter their names");
            } else if (event.key === "Enter" && newFriend.length <= 6) {
              setHelperText("The name of the friend is too short.");
            }
          }}
        />
        <Stack direction="column" spacing={2}>
          {friends.map((friend, index) => (
            <Chip
              key={index}
              color="secondary"
              variant="filled"
              label={friend}
              onDelete={() => setFriends([...friends.filter((currentFriend) => currentFriend !== friend)])}
              deleteIcon={<Cancel />}
            />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
