var Core = function(){return this};
Core.fn = Core.prototype = {
  start: function(db,get,args) {
    this.postMessage(['WORKER STARTED']);
  },
  stop: function(db,get,args) {
    this.postMessage('WORKER STOPPED');
    this.close(); // Terminates the worker.
  }
};