import React from 'react';
import {Link} from 'react-router-dom';

export default function(props) {
  return (
    <ul className="nav">
      {props.labels.map(label => {
        return (
          <li className="nav-item" key={label.id}>
            <Link to={{search: '?activeTab=' + label.id}} className="nav-link">
              {label.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
