
if (typeof Worker != 'undefined') {
    var worker = new Worker('/js/worker.js');
    
    worker.onerror = function(e) {
        //document.getElementById('log').insertAdjacentHTML('beforeEnd','error encountered'+"\n"); 
        console.error('Ops, something bad occurred!', e);
    };
    worker.onmessage = function(e) {
        //document.getElementById('log').insertAdjacentHTML('beforeEnd', JSON.stringify(e.data)+"\n" ); 
        console.debug(e.data);
    };
    
    worker.postMessage({
      do: 'Core/start'
    });
    
    document.querySelector('input[type="file"]').addEventListener('change', function(e) {
        worker.postMessage({
            do: 'File/read',
            args: this.files
        });
    }, false);
/*
    setTimeout(function(){
        worker.postMessage({
            do: 'DB/add',
            args: { taskTitle: 'title.value', hours: 'hours.value', minutes: 'minutes.value', day: 'day.value', month: 'month.value', year: 'year.value', notified: false }
        });
    }, 500);

    setTimeout(function(){
        worker.postMessage({
            do: 'DB/get',
            args: 1
        });
    }, 1000);

    setTimeout(function(){
        worker.postMessage({
            do: 'DB/update',
            args: { id: 2, taskTitle: 'title.value', hours: 'hours.value', minutes: 'minutes.value', day: 'day.value', month: 'month.value', year: 'year.value', notified: true }
        });
    }, 3000);

    setTimeout(function(){
        worker.postMessage({
            do: 'DB/truncate'
        });
    }, 5000);
    
    setTimeout(function(){
        worker.postMessage({
            do: 'DB/delete',
            args: 1
        });
    }, 2000);

    setTimeout(function(){
        worker.postMessage({
            do: 'Demo/fetch',
            args: {url:'https://preview.c9.io/chrisdlangton/web-workers/test.json'}
        });
    }, 4000);

*/
}
/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/service.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
*/

