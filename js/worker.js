(function(){
  "use strict";
  var dbName    = 'sw',
      dbVersion = 1,
      modules   = {};

  importScripts(
      '/js/modules/Core.js'
      ,'/js/modules/DB.js'
      ,'/js/modules/File.js'
      ,'/js/modules/xhrHelper.js'
  );

  modules['Core']   = modules['Core'] || new Core();
  modules['DB']     = modules['DB']   || new DB(self, dbName, dbVersion);
  modules['File']   = modules['File'] || new File(self);
  modules['xhr']    = modules['xhr']  || new XhrHelper();
  self.modules      = modules;
  
  self.onmessage = function(e) {
    var data      = e.data,
        module    = data.do.split('/')[0],
        method    = data.do.split('/')[1],
        args      = data.args || {},
        callback  = data.callback || function(){};

    modules[module][method].call(self, args, callback);
  }

})();