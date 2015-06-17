(function(){
  "use strict";
  var dbName    = 'workerDemo',
      dbVersion = 1,
      modules   = {};

  importScripts(
      '/js/modules/Core.js'
      ,'/js/modules/DB.js'
      ,'/js/modules/File.js'
      ,'/js/modules/Demo.js'
      ,'/js/modules/xhrHelper.js'
  );

  modules['Core']   = modules['Core'] || new Core();
  modules['DB']     = modules['DB']   || new DB(self, dbName, dbVersion);
  modules['File']   = modules['File'] || new File(self);
  modules['xhr']    = modules['xhr']  || new XhrHelper();
  modules['Demo']   = modules['Demo'] || new Demo();
  self.modules      = modules;
  
  self.onmessage = function(e) {
    var data      = e.data,
        module    = data.do.split('/')[0],
        method    = data.do.split('/')[1],
        args      = data.args || {};

    modules[module][method].call(self, args);
  }

})();