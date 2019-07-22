import React from 'react';

function Table(props) {
  return (
    <table className="table w-100">
      <thead className="w-100">
        <tr>
          {props.headers.map((label, i) => {
            return <th key={i}>{label}</th>;
          })}
        </tr>
      </thead>
      <tbody className="w-100">
        {props.content.map((row, i) => {
          const rowContent = row.map((coloumn, ii) => {
            return (
              <td key={ii} className="w-25">
                {coloumn}
              </td>
            );
          });
          return (
            <tr key={i} className="w-100">
              {rowContent}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
