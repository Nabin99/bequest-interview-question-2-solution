import express from "express";
import cors from "cors";

import { storeDataHash, createBackupData } from "./utils";

const PORT = 8080;
const app = express();
const database = { data: "Hello World" };

app.use(cors());
app.use(express.json());

// Initialize: Calculate and store the hash of the initial data and create a backup
storeDataHash(database.data);
createBackupData(database);

// Routes

app.get("/", (req, res) => {
  res.json(database);
});

app.post("/", (req, res) => {
  const { data } = req.body;
  if (typeof data === "string") {
    database.data = data;
    storeDataHash(database.data); // Update hash whenever data is modified
    createBackupData(database); // Update the backup
    res.sendStatus(200);
  } else {
    res
      .status(400)
      .json({ message: "Invalid data format. Expecting a string." });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
