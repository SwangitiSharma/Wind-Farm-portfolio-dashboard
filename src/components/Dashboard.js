import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import TileComponent from './TileComponent';
import CategoryChart from './CategoryChart';
import AlarmsTable from './AlarmsTable';
import devicesData from '../data/device.json';
import faultsData from '../data/fault.json';
import WindfarmFilter from './WindfarmFilter';
const Dashboard = () => {
  const [filteredFaults, setFilteredFaults] = useState([]);
  const [filteredData, setFilteredData] = useState(faultsData);
  const [selectedWindfarm, setSelectedWindfarm] = useState('');
  const [windfarmOptions, setWindfarmOptions] = useState([]);
  useEffect(() => {
    const uniqueWindfarms = new Map();

    devicesData.forEach((device) => {
      if (!uniqueWindfarms.has(device.asset_id)) {
        uniqueWindfarms.set(device.asset_id, device.asset);
      }
    });

    const options = Array.from(uniqueWindfarms, ([asset_id, asset]) => ({ asset_id, asset }));
    setWindfarmOptions(options);
  }, []);

  const handleWindfarmChange = (selectedValue) => {
    setSelectedWindfarm(selectedValue);
    const filtered = faultsData.filter(fault => fault.asset_id === parseInt(selectedValue));
    setFilteredData(filtered)
    setFilteredFaults(filtered);
  };

  const handleFilterChange = (filters) => {
    const { device, faultType, code, timeRange } = filters;
    let filtered = filteredFaults;

    if (device) {
      filtered = filtered.filter(fault => fault.device_id === parseInt(device));
    }

    if (faultType) {
      filtered = filtered.filter(fault => fault.fault_type === faultType);
    }

    if (code) {
      filtered = filtered.filter(fault => fault.code === parseInt(code));
    }

    if (timeRange.startTime && timeRange.endTime) {
      const start = new Date(timeRange.startTime).getTime();
      const end = new Date(timeRange.endTime).getTime();
      filtered = filtered.filter(fault => {
        const faultTime = new Date(fault.time_stamp).getTime();
        return faultTime >= start && faultTime <= end;
      });
    }
    setFilteredData(filtered);
  };
  const handleResetFilters = () => {
    setFilteredData(filteredFaults); // Reset to show all faults for the selected windfarm
  };
  const totalAlarmDuration = filteredData.reduce((total, fault) => total + fault.duration_seconds, 0);
  const totalAlarms = filteredData.length;
  const maxDurationFault = filteredData.reduce((max, fault) => fault.duration_seconds > max.duration_seconds ? fault : max, { duration_seconds: 0 });

  return (
    <div className="dashboard">
     <WindfarmFilter options={windfarmOptions} onChange={handleWindfarmChange} />//main filter
     <Filters faults={filteredFaults} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} /> {/* assumtion this is sub filter which is produced based on selection of wind farm */}
     <div className="tiles">
        <TileComponent 
          title="TOTAL ALARM DURATION" 
          value={`${Math.floor(totalAlarmDuration / 3600)} hrs, ${Math.floor((totalAlarmDuration % 3600) / 60)} min, ${Math.floor(totalAlarmDuration % 60)} sec`}
          description=""
          color="orange"
        />
        <TileComponent 
          title="TOTAL COUNT OF ALARMS" 
          value={totalAlarms}
          color="green"
        />
        <TileComponent 
          title="DEVICE WITH MAX DURATION ALARM" 
          value={`${Math.floor(maxDurationFault.duration_seconds / 3600)} hrs, ${Math.floor((maxDurationFault.duration_seconds % 3600) / 60)} min, ${Math.floor(maxDurationFault.duration_seconds % 60)} sec`}
          color="green"
        />
      </div>
      <CategoryChart chartData={filteredData} windfarm={selectedWindfarm}/>{/*  selectedWindfarm:- assuming there would be a api call which would reqired asset id */}
      <AlarmsTable windfarm={filteredData}/> {/* All data are displayed in this filter without filter, though passed filtered data in case we need to show filtered data in table*/}
    </div>
  );
};

export default Dashboard;
