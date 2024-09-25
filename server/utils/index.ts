import crypto from "crypto";
import fs from "fs";

// Path to the file where the data hash and backup will be stored
export const dataHashFilePath = "./files/data-hash.txt";
export const backupFilePath = "./files/backup-data.json";

// Function to calculate the SHA-256 hash of the data
export function calculateDataHash(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

// Function to store the hash of the data
export function storeDataHash(data: string): void {
  const dataHash = calculateDataHash(data);
  fs.writeFileSync(dataHashFilePath, dataHash);
}

// Function to create a backup of the current data
export function createBackupData(data: { data: string }): void {
  fs.writeFileSync(backupFilePath, JSON.stringify(data, null, 2));
}

// Function to load the last known good backup of the data
export function getLastKnownGoodData(): { data: string } {
  if (fs.existsSync(backupFilePath)) {
    const backupData = fs.readFileSync(backupFilePath, "utf8");
    return JSON.parse(backupData);
  }
  // Return default value if no backup exists
  return { data: "Hello World" };
}
