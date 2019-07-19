import Table from './Table';
import React from 'react';
// import icons from 'glyphicons';

export default function({headers, onSortChange, sorting, ...props}) {
  const newLabels = headers.map(label => {
    const icon = (() => {
      if (label.sortable) {
        console.log(sorting.sortBy, label.request);
        if (sorting.sortBy !== label.request) return '🔘';
        return sorting.sortOrder === 'desc' ? '⬇️' : '⬆️';
      }
    })();

    return (
      <div>
        <a
          onClick={() => {
            onSortChange(label);
          }}
        >
          <span role="img" aria-label="arrow">
            {icon}
          </span>
        </a>
        {label.content}
      </div>
    );
  });

  return <Table headers={newLabels} {...props} />;
}
