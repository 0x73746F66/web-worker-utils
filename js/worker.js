(function(){
  var dbName = 'workerDemo',
      dbVersion = 1,
      modules = {};

  importScripts(
      '/chrisdlangton/web-workers/js/modules/Core.js'
      ,'/chrisdlangton/web-workers/js/modules/DB.js'
      ,'/chrisdlangton/web-workers/js/modules/File.js'
      ,'/chrisdlangton/web-workers/js/modules/Demo.js'
      ,'/chrisdlangton/web-workers/js/modules/xhrHelper.js'
  );

  modules['Core'] = modules['Core'] || new Core();
  modules['DB'] = modules['DB'] || new DB(self, dbName, dbVersion);
  modules['File'] = modules['File'] || new File(self);
  modules['xhr'] = modules['xhr'] || new XhrHelper();
  modules['Demo'] = modules['Demo'] || new Demo();
  self.modules = modules;
  
  self.requestFileSystemSync = self.webkitRequestFileSystemSync ||
                             self.requestFileSystemSync;
  
  self.onmessage = function(e) {
    var data    = e.data,
        module  = data.do.split('/')[0],
        method  = data.do.split('/')[1],
        args    = data.args || {};

    modules[module][method].call(self, args);
  }

})();