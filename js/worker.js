(function(){
    importScripts(
        'https://preview.c9.io/chrisdlangton/web-workers/js/xhrHelper.js'
        ,'https://preview.c9.io/chrisdlangton/web-workers/js/tXml.js'
        //,'https://preview.c9.io/chrisdlangton/web-workers/js/pusher-2.2.min.js'
    );
    
    onmessage = function(e) {
        var data = e.data;

        switch (data.do) {
            case 'start':
                postMessage('WORKER STARTED');
                
                break;
            case 'echo':
                postMessage(data);
                
                break;
            case 'info':
                postMessage(JSON.parse(JSON.stringify(navigator)));
                
                break;
            case 'stop':
                postMessage('WORKER STOPPED');
                close(); // Terminates the worker.
                
                break;
            default:
                postMessage('Unknown');
        }
        
    }

})();