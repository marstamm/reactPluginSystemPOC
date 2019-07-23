import React from 'react';

export default function(props) {
  return (
    <div className="ctn-column h-100 w-25" style={{overflow: 'hidden'}}>
      {props.children}
    </div>
  );
}
