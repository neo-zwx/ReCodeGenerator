import React from 'react';
import TableRow from "./TableRow";

const FormInputTable = ({ formData, handleInputChange }) => {
  return (
    <div className="card">
      <h5 className="card-header">Input Table</h5>
      <div className="card-body">
        <table>
          <tbody>
            {Object.entries(formData).map(([key, value]) => (
              <TableRow key={key} label={key} value={value} onChange={(value) => handleInputChange(key, value)} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormInputTable;
