import { Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PartiesSchema } from "../../@types/PartiesSchema";
import { UserContext } from "../App";
import Offset from "../components/Offset";
import PartyCard from "../components/Parties/PartyCard";

export default function Parties() {
  const { user, setUser } = useContext(UserContext);
  const [parties, setParties] = useState<PartiesSchema[] | null>(null);

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

  useEffect(() => {
    fetch("/api/parties")
      .then((r) => r.json())
      .then((r) => {
        if (r.err) alert(r.err);
        else {
          setParties(r.data);
        }
      });
  }, []);

  return (
    <>
      <Offset multiplier={3} />
      <Typography variant="h2" fontWeight={900} sx={{ mb: 4, textAlign: "center" }}>
        These are all the scheduled parties
      </Typography>
      <Stack direction="column" spacing={2} sx={{ px: 4 }}>
        {parties?.map((party) => (
          <PartyCard party={party} />
        ))}
      </Stack>
    </>
  );
}
