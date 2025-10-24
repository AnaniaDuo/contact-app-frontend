import React, { useState, useEffect } from "react";
import Table from "../reusable/Table";
import CONTACTS from "../constants/constants";
import Papa from "papaparse";
import { useCookies } from "react-cookie";

function Contacts() {
  const [contacts, setContacts] = useState(CONTACTS);
  const [newCsvContacts, setNewCsvContacts] = useState([]);
  const [token] = useCookies("mr-token");

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("what is contacts", result.data);
        setContacts([...contacts, ...result.data]);
        setNewCsvContacts(result.data);
      },
    });
  };

  async function onCsvImport() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/import-contacts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ contacts: newCsvContacts }),
        }
      );

      const data = await response.json();
      alert("Contacts imported successfully");
      console.log("Updated contacts:", data.contacts);
      console.log("Data message", data.message);
    } catch (err) {
      console.error("Error uploading contacts", err);
    }
  }

  return (
    <div className="mt-4">
      <Table data={contacts} />
      <div className="flex justify-center">
        <button
          type="button"
          className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={onCsvImport}
        >
          Import
        </button>
        <input type="file" accept=".csv" onChange={onFileUpload} />
      </div>
    </div>
  );
}

export default Contacts;
