import React from 'react';

function Table(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          {props.headers.map((label, i) => {
            return <th key={i}>{label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.content.map((row, i) => {
          const rowContent = row.map((coloumn, ii) => {
            return <td key={ii}>{coloumn}</td>;
          });
          return <tr key={i}>{rowContent}</tr>;
        })}
      </tbody>
    </table>
  );
}

export default Table;
