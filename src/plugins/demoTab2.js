import React from 'react';

function demoTab({processList}) {
  return <h3>This is another Placeholder</h3>;
}

export default {
  id: 'demo-tab2',
  label: 'demo2',
  entry: 'cockpit.process.definition.tab',
  component: demoTab
};
