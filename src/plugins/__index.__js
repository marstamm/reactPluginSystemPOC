import processList from './processList';
import demoTab from './demoTab';
import demoTab2 from './demoTab2';
import processInstances from './processInstances';
import Incidents from './Incidents';

export default {
  plugins: {},
  addPlugin: function(plugin) {
    this.plugins[plugin.entry] = this.plugins[plugin.entry]
      ? this.plugins[plugin.entry].concat(plugin)
      : [plugin];
  },
  getPlugins: function() {
    this.addPlugin(processList);
    this.addPlugin(processInstances);
    this.addPlugin(Incidents);

    this.addPlugin(demoTab);
    this.addPlugin(demoTab2);

    return this.plugins;
  }
};
