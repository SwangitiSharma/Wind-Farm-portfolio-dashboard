import React, {useState}from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Filters= ({ faults, onFilterChange, onResetFilters }) => {
  const [deviceName, setDeviceName] = useState('');
  const [faultType, setFaultType] = useState('');
  const [code, setCode] = useState('');
  const [timeRange, setTimeRange] = useState({ startTime: '', endTime: '' });
  const [isExpanded, setIsExpanded] = useState(false);
  const uniqueDeviceNames = [...new Set(faults.map(fault => fault.category))];
  const uniqueFaultTypes = [...new Set(faults.map(fault => fault.fault_type))];
  const uniqueCodes = [...new Set(faults.map(fault => fault.code))];

  const handleFilterChange = () => {
    onFilterChange({ deviceName, faultType, code, timeRange });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleResetFilters = () => {
    setDeviceName('');
    setFaultType('');
    setCode('');
    setTimeRange({ startTime: '', endTime: '' });
    onResetFilters();
  };

  return (
    <div className="filter-container">
      <button onClick={toggleExpand}>
        {isExpanded ? 'Collapse' : 'Expand'} Filter
      </button>
      {isExpanded && (
        <div className="filter-content">
          <div className="filter-item">
            <label>Device Name:</label>
            <select value={deviceName} onChange={(e) => setDeviceName(e.target.value)}>
              <option value="">All</option>
              {uniqueDeviceNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label>Fault Type:</label>
            <select value={faultType} onChange={(e) => setFaultType(e.target.value)}>
              <option value="">All</option>
              {uniqueFaultTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label>Code:</label>
            <select value={code} onChange={(e) => setCode(e.target.value)}>
              <option value="">All</option>
              {uniqueCodes.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label>Start Date:</label>
            <input 
              type="date" 
              value={timeRange.startTime} 
              onChange={(e) => setTimeRange({...timeRange, startTime: e.target.value})}
            />
          </div>
          <div className="filter-item">
            <label>End Date:</label>
            <input 
              type="date" 
              value={timeRange.endTime} 
              onChange={(e) => setTimeRange({...timeRange, endTime: e.target.value})}
            />
            </div>
          <button onClick={handleFilterChange}>Apply Filters</button>
          <button onClick={handleResetFilters}>Reset Filters</button>
        </div>
      )}
    </div>
  );
};

export default Filters;
