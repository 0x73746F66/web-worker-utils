(function(){
    importScripts('xhrHelper.js', 'tXml.js');

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