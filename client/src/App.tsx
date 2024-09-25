import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function App() {
  const [data, setData] = useState<string>();
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setStatus("");
    try {
      const response = await fetch(`${API_URL}/`);
      const { data } = await response.json();
      setData(data);
    } catch (error) {
      setStatus("Error fetching data");
    }
  };

  const updateData = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      await getData();
      setStatus("Data updated successfully");
    } catch (error) {
      setStatus("Error updating data");
    }
  };

  // Verify the integrity of the data on the server
  const verifyData = async () => {
    setStatus("Verifying data...");

    try {
      const response = await fetch(`${API_URL}/recover-data`, {
        method: "POST",
      });

      const result = await response.json();

      if (result.message.includes("recovered")) {
        setData(result.recoveredData.data); // Update the UI with recovered data if tampered
      }

      setStatus(result.message); // Display the verification result
    } catch (error) {
      setStatus("Error verifying data");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
      </div>

      {status && (
        <div style={{ color: "red", fontSize: "20px", marginTop: "20px" }}>
          {status}
        </div>
      )}
    </div>
  );
}

export default App;
