import React from 'react';
import angular from 'angular';

class AngularWrapper extends React.Component {
  constructor(props) {
    super(props);

    const that = this;
    this.view = {};

    angular.module('ngApp', []);

    angular.module('ngApp').provider('Views', function() {
      this.registerDefaultView = function(id, obj) {
        that.view = obj;
      };

      this.getDefaultView = () => {
        return that.view;
      };

      this.$get = function() {
        var service = {
          getDefaultView: this.getDefaultView()
        };

        return service;
      };
    });

    angular.module('ngApp').controller();

    var angularPlugin = require('./JSOnly');

    angular.module('rootModule', ['ngApp', angularPlugin.name]);

    const controller = [
      '$scope',
      '$sce',
      function($scope, $sce) {
        $scope.content = $sce.trustAsHtml(that.view.template);
      }
    ];

    angular.module('ngApp').controller('MyCtrl', controller);
  }

  componentDidMount() {
    this.$rootScope = angular.injector(['ng', 'rootModule']).get('$rootScope');

    angular.bootstrap(this.container, ['rootModule']);
  }

  componentWillUnmount() {
    this.$rootScope.$destroy();
  }

  html = `<div ng-controller="MyCtrl">
    <div ng-bind-html="content" />
  </div>`;

  render = () => {
    return (
      <div
        ref={c => (this.container = c)}
        dangerouslySetInnerHTML={{__html: this.html}}
      />
    );
  };
}

export default {
  id: 'process-list',
  entry: 'cockpit.processes',
  component: AngularWrapper
};
