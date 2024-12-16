import React from 'react';

const PatternSelect = ({ patterns, onPatternChange }) => {
  return (
    <div>
      <label htmlFor="patternSelect">Select Pattern:</label>
      <select
        id="patternSelect"
        onChange={(e) => onPatternChange(e.target.value)}
      >
        <option value="">-- Select Pattern --</option>
        {Object.keys(patterns).map((patternKey) => (
          <option key={patternKey} value={patternKey}>
            {patterns[patternKey].title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PatternSelect;
