import Table from './Table';
import React from 'react';
// import icons from 'glyphicons';

export default function({headers, onSortChange, sorting, ...props}) {
  const newLabels = headers.map(label => {
    const icon = (() => {
      if (label.sortable) {
        if (sorting.sortBy !== label.request) return '🔘';
        return sorting.sortOrder === 'desc' ? '⬇️' : '⬆️';
      }
    })();

    return (
      <div className="w-100">
        <button
          onClick={() => {
            onSortChange(label);
          }}
          style={{padding: 0, border: 'none', background: 'none'}}
        >
          <span role="img" aria-label="arrow">
            {icon}
          </span>
        </button>
        {label.content}
      </div>
    );
  });

  return <Table headers={newLabels} {...props} />;
}
