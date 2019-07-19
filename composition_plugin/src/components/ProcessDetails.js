import React from 'react';

export default function({processDetails}) {
  console.log(processDetails);
  return (
    <div>
      <dt>Definition Version:</dt>
      <dd>{processDetails['version']}</dd>

      <dt>Version Tag:</dt>
      <dd>{processDetails['versionTag'] || 'null'}</dd>

      <dt>Definition ID:</dt>
      <dd>{processDetails['id'] || 'null'}</dd>

      <dt>Definition Key:</dt>
      <dd>{processDetails['key'] || 'null'}</dd>

      <dt>Definition Name:</dt>
      <dd>{processDetails['name'] || 'null'}</dd>

      <dt>History Time To Live:</dt>
      <dd>{processDetails['historyTimeToLive'] || 'null'}</dd>

      <dt>Tenant ID:</dt>
      <dd>{processDetails['tenantId'] || 'null'}</dd>

      <dt>Deployment ID:</dt>
      <dd>{processDetails['deploymentId'] || 'null'}</dd>
    </div>
  );
}
