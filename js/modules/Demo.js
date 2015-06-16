var Demo = function(){return this};
Demo.fn = Demo.prototype = {
  echo: function(args) {
    this.postMessage(args);
  },
  info: function(args) {
    postMessage(JSON.parse(JSON.stringify(this.navigator)));
  },
  fetch: function(args) {
    this.modules['xhr'].get(args.url, function(resp) {
      postMessage(resp);
    });
  }
};