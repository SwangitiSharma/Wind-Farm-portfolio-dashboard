import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import data from '../data/tableData.json';
import '../App.css';
const AlarmTable = (windfarm) => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    setRowData(data);
  }, []);

  const columns = [
    { headerName: 'Device', field: 'Device', filter: true, sortable: true   },
    { headerName: 'Start Time', field: 'StartTime', sortable: true  },
    { headerName: 'Resolution Time', field: 'ResolutionTime', sortable: true  },
    { headerName: 'Duration of Alarm', field: 'DurationOfAlarm', sortable: true  },
    { headerName: 'Category', field: 'Category', filter: true , sortable: true  },
    { headerName: 'Alarm Code', field: 'AlarmCode', filter: true, sortable: true   },
    { headerName: 'Description', field: 'Description', filter: true, sortable: true  },
    { headerName: 'Contractual Availability', field: 'ContractualAvailability', filter: true, sortable: true   },
    { headerName: 'Alarm Level', field: 'AlarmLevel', filter: true, sortable: true   },
    { headerName: 'Alarm Order', field: 'AlarmOrder', filter: true, sortable: true   },
    { headerName: 'Updated By', field: 'UpdatedBy', filter: true, sortable: true   },
  ];
  const defaultColDef = {
    sortable: true,
    resizable: true,
  };
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columns}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default AlarmTable;
