# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal server or database is breached.

**1. How does the client ensure that their data has not been tampered with?**
<br />
**2. If the data has been tampered with, how can the client recover the lost data?**

Edit this repo to answer these two questions using any technologies you'd like, there any many possible solutions. Feel free to add comments.

### To run the apps:

```npm run start``` in both the frontend and backend

## To make a submission:

1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance

# 

# Solution for the given question

Although the best solution to the problem would be with the use of block chain technology like web3, Since the question doesn't specify any specific solution, limitations or guidance. I took a simpler approach to the solution. Though the solution won't solve the real world problem, it should be enough to satisfy the given problems.

## 1. How does the client ensure that their data has not been tampered with?

This solution uses a mechanism to verify data integrity using hashing:

- **Hashing Data**: When the data is initially set, a SHA-256 hash of the data is calculated and stored in a file. This hash acts as a fingerprint of the original data.
- **Verification Endpoint**: There is an API endpoint (`/recover-data`) that allows the client to verify if the current data matches the stored hash. If the data has not been tampered with, the server responds confirming the integrity of the data. If the hashes do not match, the server can detect tampering.
- **User Experience**: In the React app, there is a "Verify Data" button that triggers this verification process, allowing users to confirm that their data remains untampered.

## 2. If the data has been tampered with, how can the client recover the lost data?

The solution provides a recovery mechanism:

- **Backup System**: When the data is initially set, a backup of the original data is created in a separate file. This acts as the last known good state of the data.
- **Recovery Endpoint**: If tampering is detected, the `/recover-data` endpoint retrieves the last known good backup of the data and restores it, ensuring the system can revert to a secure state.
- **User Feedback**: The React app provides feedback when the data is recovered, alerting the user to the fact that tampering was detected and that the original data has been restored.
