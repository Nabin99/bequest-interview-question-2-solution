import express from "express";
import cors from "cors";
import fs from "fs";

import {
  storeDataHash,
  createBackupData,
  dataHashFilePath,
  calculateDataHash,
  getLastKnownGoodData,
} from "./utils";

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

// Verify and recover the data if it has been tampered with
app.post("/recover-data", (req, res) => {
  const storedHash = fs.readFileSync(dataHashFilePath, "utf8");
  const calculatedHash = calculateDataHash(database.data);

  if (calculatedHash !== storedHash) {
    // Data has been tampered with, recover the last known good state
    const lastGoodData = getLastKnownGoodData();
    database.data = lastGoodData.data;

    // Update the stored hash after recovery
    storeDataHash(database.data);

    res.json({
      message: "Data has been tampered with and recovered successfully",
      recoveredData: database,
    });
  } else {
    res.json({ message: "Data integrity verified. No tampering detected." });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
