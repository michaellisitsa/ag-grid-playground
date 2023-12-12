"use client";
import { useState } from "react";

import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

function SimpleTable() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    {
      mission: "Voyager",
      company: "NASA",
      location: "Cape Canaveral",
      date: "1977-09-05",
      rocket: "Titan-Centaur ",
      price: 86580000,
      successful: true,
    },
    {
      mission: "Apollo 13",
      company: "NASA",
      location: "Kennedy Space Center",
      date: "1970-04-11",
      rocket: "Saturn V",
      price: 3750000,
      successful: false,
    },
    {
      mission: "Falcon 9",
      company: "SpaceX",
      location: "Cape Canaveral",
      date: "2015-12-22",
      rocket: "Falcon 9",
      price: 9750000,
      successful: true,
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "mission" },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { field: "price" },
    { field: "successful" },
    { field: "rocket" },
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs as any} />
    </div>
  );
}

export default SimpleTable;
