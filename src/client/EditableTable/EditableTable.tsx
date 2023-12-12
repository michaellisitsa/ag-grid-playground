"use client";
import { useState, useRef, useCallback } from "react";

import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

function EditableTable() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    {
      mission: "Voyager",
      company: "NASA",
    },
    {
      mission: "Voyager",
      company: "NASA",
    },
    {
      mission: "Voyager",
      company: "NASA",
    },
    {
      mission: "Voyager",
      company: "NASA",
    },
    {
      mission: "Voyager",
      company: "NASA",
    },
  ]);

  console.log("rowData first: ", rowData[0].company, rowData[0].mission);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "mission", editable: true },
    { field: "company", editable: true },
  ]);

  const gridRef = useRef(null);

  const onClick = useCallback(() => {
    // Use the gridRef to access the api
    const rows = gridRef.current!.api.getSelectedRows();
    console.log("rows", rows);
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs as any}
        enableCellEditingOnBackspace={true}
        // enterNavigatesVertically={true}
        enterNavigatesVerticallyAfterEdit={true}
        // enableRangeSelection={true} // Enterprise only https://www.ag-grid.com/javascript-data-grid/range-selection/
        onSelectionChanged={onClick} // But can use this with rowSelection to allow a user to export a number of selected rows
        gridOptions={{
          singleClickEdit: true,
          rowSelection: "multiple", // Copying from the grid is enabled by default for enterprise users.
        }}
      />
    </div>
  );
}

export default EditableTable;
