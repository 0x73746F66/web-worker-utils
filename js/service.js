(function(){
  
  /*
   * Example Google I/O: https://events.google.com/io2015/service-worker.js
   */
  
    importScripts(
      'https://preview.c9.io/chrisdlangton/web-workers/js/serviceworker-cache-polyfill.js'
    );
    
    // example usage:
    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('demo-cache').then(function(cache) {
          return cache.put('/', new Response("From the cache!"));
        })
      );
    });
    
    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || new Response("Nothing in the cache for this request");
        })
      );
    });

    self.addEventListener('message', function(event) {
      if (event.data.command == 'delete_all') {
        console.log('About to delete all caches...');
        (function(){
          return caches.keys().then(function(cacheNames) {
            return Promise.all(
              cacheNames.map(function(cacheName) {
                return caches.delete(cacheName);
              })
            );
          });
        })().then(function() {
          console.log('Caches deleted.');
          event.ports[0].postMessage({
            error: null
          });
        }).catch(function(error) {
          console.log('Caches not deleted:', error);
          event.ports[0].postMessage({
            error: error
          });
        });
      }
    });

})();