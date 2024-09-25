import crypto from "crypto";
import fs from "fs";

// Path to the file where the data hash and backup will be stored
const dataHashFilePath = "./files/data-hash.txt";
const backupFilePath = "./files/backup-data.json";

// Function to calculate the SHA-256 hash of the data
function calculateDataHash(data: string): string {
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
