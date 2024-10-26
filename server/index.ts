import "dotenv/config";
import express, { json } from "express";
import generateID from "../src/utils/generateID";

import passport from "passport";
import { PartiesSchema } from "../@types/PartiesSchema";
import { User } from "../@types/User";
import cors from "./middleware/cors";
import initPassportGoogleOAuth, { sqlStore } from "./middleware/passport-google-oauth";

const app = express();
app.use(cors);
initPassportGoogleOAuth(app, passport);

app.use(json());

app.get("/parties", async (req, res) => {
  if (!req.user) {
    res.status(401).json({ err: "You're not authorized", data: null });
    return;
  }

  try {
    type PartiesSchemaStringifiedRoles = Omit<PartiesSchema, "roles"> & { roles: string };

    const [rows]: [rows: PartiesSchemaStringifiedRoles[]] = await sqlStore.query("SELECT * FROM parties", null);
    const parties = rows.map((row) => ({
      id: row.id,
      organizer: row.organizer,
      size: row.size,
      budget: row.budget,
      roles: JSON.parse(row.roles),
      date: row.date,
      location: row.location,
    }));

    res.status(200).json({ err: null, data: parties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching parties", data: null });
  }
});

app.post("/create-party", async (req, res) => {
  if (!req.user) {
    res.status(401).json({ err: "You're not authorized", data: null });
    return;
  }

  const { size, budget, roles, date, location } = req.body;

  if (!size || !budget || !roles || !date || !location) {
    res.status(400).json({ err: "All fields are required", data: null });
    return;
  }

  try {
    const partyID = generateID(10);
    const organizer: string = (req.user as User).name;

    await sqlStore.query(
      "INSERT INTO parties (id, organizer, size, budget, roles, date, location) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [partyID, organizer, size, budget, JSON.stringify(roles), date, location]
    );

    res.status(201).json({ err: null, data: partyID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the party" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => (err ? (console.error(err), next(err)) : res.json({ err: null, data: "Logout successful" })));
});

app.get("/login", (req, res, next) => {
  if (req.user) res.redirect("http://localhost:5173/");
  else next(null);
});

app.get("/user", (req, res) => {
  if (!req.user) {
    res.json({ err: "Not authenticated", data: null });
    return;
  }

  res.json({ err: null, data: req.user });
  return;
});

app.listen(3000, () => console.log("Listening."));
