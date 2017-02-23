var util = require('util'),
    fs = require('fs'),
    path = require('path'),
    conf = require('./../config/config.json'),
    RouterManager = require("./RouterManager"),
    rootDir = fs.realpathSync(path.join(__dirname, '..'));

exports.addRoutes = function(app) {
    var k,name, apiIncludeFile, dirs, routes, file;
    dirs = fs.readdirSync(path.join(rootDir, conf.routes.dir)).filter(function (v) {
      return fs.lstatSync(path.join(rootDir, conf.routes.dir,v)).isDirectory();
    });

    for (k in dirs) {
        if (typeof(dirs[k]) == 'string') {
          routes = fs.readdirSync(path.join(rootDir, conf.routes.dir, dirs[k])).filter(function (v) {
            return (/.js$/).test(v);
          });
          for (file in routes) {
              if (typeof(routes[file]) == 'string') {
                name = routes[file].substr(0, routes[file].indexOf('.'));
                apiIncludeFile = path.join(rootDir, conf.routes.dir, dirs[k],name);
                app.use('/api',RouterManager(app, require(apiIncludeFile)));
              }
          }
        }
    }
};
