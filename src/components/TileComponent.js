import React from 'react';

const TileComponent = ({ title, value, description, color }) => {
  return (
    <div className="tile" style={{ borderTop: `5px solid ${color}` }}>
      <h2 style={{ color }}>{value}</h2>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default TileComponent;
