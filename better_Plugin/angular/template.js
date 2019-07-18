export default `<style>
.full button span {
  background-color: limegreen;
  border-radius: 32px;
  color: black;
}
.partially button span {
  background-color: orange;
  border-radius: 32px;
  color: black;
}
</style>
<div ng-controller="DatepickerDemoCtrl">
  <h3>This is the injected Process ID: {{processId.id}}</h3>
  <h3>This is the Process ID we get from a getter: {{processId.getId()}}</h3>
  <button type="button" class="btn btn-sm btn-default" ng-click="updatePI()">Check PI</button>


  <uib-accordion>
    <div uib-accordion-group class="panel-default" heading="Some Bootstrap Rendering stuff">
      <pre>Selected date is: <em>{{dt | date:'fullDate' }}</em></pre>

      <h4>Inline</h4>
      <div style="display:inline-block; min-height:290px;">
        <div uib-datepicker ng-model="dt" class="well well-sm" datepicker-options="options"></div>
      </div>

      <hr />
      <button type="button" class="btn btn-sm btn-info" ng-click="today()">Today</button>
      <button type="button" class="btn btn-sm btn-default" ng-click="setDate(2009, 7, 24)">2009-08-24</button>
      <button type="button" class="btn btn-sm btn-danger" ng-click="clear()">Clear</button>
      <button type="button" class="btn btn-sm btn-default" ng-click="toggleMin()" uib-tooltip="After today restriction">Min date</button>
    </div>


  </uib-accordion>

</div>`