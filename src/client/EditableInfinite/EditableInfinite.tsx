"use client";
import { useState, useRef, useCallback, useMemo } from "react";

import { AgGridReact } from "@ag-grid-community/react";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
ModuleRegistry.registerModules([InfiniteRowModelModule]);

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

function EditableInfinite() {
  // Row Data: The data to be displayed.
  const gridRef = useRef(null);

  // Column Definitions: Defines & controls grid columns.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "ID",
      maxWidth: 100,
      // it is important to have node.id here, so that when the id changes (which happens
      // when the row is loaded) then the cell is refreshed.
      valueGetter: "node.id",
      cellRenderer: (props) => {
        if (props.value !== undefined) {
          return props.value;
        } else {
          return (
            <img src="https://www.ag-grid.com/example-assets/loading.gif" />
          );
        }
      },
    },

    { field: "athlete", minWidth: 150 },
    { field: "age" },
    { field: "country", minWidth: 150 },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: false,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        const dataSource = {
          rowCount: undefined,
          getRows: (params) => {
            console.log(
              "asking for " + params.startRow + " to " + params.endRow
            );
            // At this point in your code, you would call the server.
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
              // take a slice of the total rows
              const rowsThisPage = data.slice(params.startRow, params.endRow);
              // if on or after the last page, work out the last row.
              let lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              // call the success callback
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api.setGridOption("datasource", dataSource);
      });
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs as any}
        rowBuffer={0}
        defaultColDef={defaultColDef}
        rowModelType="infinite"
        enableCellEditingOnBackspace={true}
        animateRows={true}
        // enterNavigatesVertically={true}
        enterNavigatesVerticallyAfterEdit={true}
        // enableRangeSelection={true} // Enterprise only https://www.ag-grid.com/javascript-data-grid/range-selection/
        gridOptions={{
          singleClickEdit: true,
          rowSelection: "multiple", // Copying from the grid is enabled by default for enterprise users.
        }}
        cacheBlockSize={100}
        cacheOverflowSize={2}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={1000}
        maxBlocksInCache={10}
        onGridReady={onGridReady}
      />
    </div>
  );
}

export default EditableInfinite;
