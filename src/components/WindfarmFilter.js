import React, { useState } from 'react';

const WindfarmFilter = ({ options, onChange }) => {
  const [selectedWindfarm, setSelectedWindfarm] = useState('');

  const handleWindfarmChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedWindfarm(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div>
      <select id="windfarm" value={selectedWindfarm} onChange={handleWindfarmChange}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.asset_id} value={option.asset_id}>{option.asset}</option>
        ))}
      </select>
    </div>
  );
};
export default WindfarmFilter;
