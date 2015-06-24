# web-workers

If you are interested in seeing how multithreading can be achieved in browsers using HTML5 WebWorkers check out this repo.

I've covered code seperation by organising each module and method in a clean way.
These Modules include examples of the following features;

* IndexedDB
* FileReaderSync
* XMLHttpRequest (with ActiveXObject fallback)

Given these features are accessible now apart from the main browser thread means that users UX including WebGL, Canvas, scrolling, and amimations - are all going to operate without lag or lockups when doing CPU/Memory intensive async operations.

## Browser Support

http://caniuse.com/#feat=webworkers

## Production ready
No, the error handling has just been implemented with debuggin in mind, any suggestions here would be appreciated as i've not come up with a clean solution and 3rd party tools like Raygun.io are not supported yet in the Worker scope.
