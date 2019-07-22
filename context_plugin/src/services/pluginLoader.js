var normalizedPath = require('path').join(__dirname, '../plugins');
var fs = require('fs');

let plugins = {};
const addPlugin = function(plugin) {
  plugins[plugin.entry] = plugins[plugin.entry]
    ? plugins[plugin.entry].concat(plugin)
    : [plugin];
};

// var fs = require('fs');
console.log(fs);
fs.readdirSync(normalizedPath).forEach(function(file) {
  console.log(file);
  addPlugin(require('../plugins/' + file));
});

export default plugins;

// export default {
//   plugins: {},
//   getPlugins: function() {
//     this.addPlugin(processList);
//     this.addPlugin(processInstances);
//     this.addPlugin(Incidents);

//     this.addPlugin(demoTab);
//     this.addPlugin(demoTab2);

//     return this.plugins;
//   }
// };
