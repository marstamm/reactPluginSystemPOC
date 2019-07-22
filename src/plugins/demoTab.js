import React from 'react';

function demoTab({processList}) {
  return <h3>This is a Placeholder</h3>;
}

export default {
  id: 'demo-tab',
  label: 'demo',
  entry: 'cockpit.process.definition.tab',
  component: demoTab
};
