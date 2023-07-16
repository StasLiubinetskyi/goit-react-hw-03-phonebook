import React from 'react';

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <label>Filter contacts by name:</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
