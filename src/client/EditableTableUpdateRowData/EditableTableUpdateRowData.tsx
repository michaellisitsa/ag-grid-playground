"use client";
import { useState, useRef, useCallback } from "react";

import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { createOneCarRecord } from "@/client/utils/carFactory";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

// Our data store
const CARS = [...new Array(1000)].map(() => createOneCarRecord());

function EditableTableUpdateRowData() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState(CARS);
  const gridRef = useRef(null);

  console.log("rowData first: ", rowData[0].company, rowData[0].mission);

  // Column Definitions: Defines & controls grid columns.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Row",
      valueGetter: "node.rowIndex + 1",
    },
    { field: "type", sortable: true, editable: true },
    { field: "year", editable: true },
    { field: "color", editable: true },
    {
      field: "price",
      editable: true,
      // valueFormatter: myValueFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
  ]);

  const onClick = useCallback(() => {
    // Use the gridRef to access the api
    const rows = gridRef.current?.api.getSelectedRows();
    console.log("rows", rows);
  }, []);

  const onTxInsertOne = useCallback(() => {
    const newRecord = createOneCarRecord();
    const res = gridRef.current?.api.applyTransaction({
      add: [newRecord],
    });
    console.log(res);
  }, []);

  const getRowId = useCallback((params) => {
    return params.data.id;
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <div>
        <button onClick={onTxInsertOne}>Insert One</button>
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        getRowId={getRowId}
        columnDefs={columnDefs as any}
        enableCellEditingOnBackspace={true}
        animateRows={true}
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

export default EditableTableUpdateRowData;
