// components/TableRow.js
import React from "react";

const TableRow = ({ label, value, onChange }) => {
  return (
    <table className="tableRow">
      <tbody>
        <tr>
          <td>
            <label>{label}</label>
          </td>
          <td>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableRow;
