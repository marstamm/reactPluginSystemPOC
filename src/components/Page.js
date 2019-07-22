import React from 'react';

export default function(props) {
  // Just preted we have a header
  return <div className="h-100 w-100 d-flex flex-row">{props.children}</div>;
}
