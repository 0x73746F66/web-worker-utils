var File = function(worker) {
  worker.requestFileSystemSync = worker.webkitRequestFileSystemSync || worker.requestFileSystemSync;

  this.fs;
  var paths = []; // Global to hold the list of entry filesystem URLs.

  function getAllEntries(dirReader) {
    var entries = dirReader.readEntries();
  
    for (var i = 0, entry; entry = entries[i]; ++i) {
      paths.push(entry.toURL()); // Stash this entry's filesystem: URL.
  
      // If this is a directory, we have more traversing to do.
      if (entry.isDirectory) {
        getAllEntries(entry.createReader());
      }
    }
  }
  try {
    this.fs = requestFileSystemSync(TEMPORARY, 1024*1024 /*1MB*/);

    getAllEntries(this.fs.root.createReader());

    worker.postMessage({entries: paths});
  } catch (e) {
    worker.postMessage(e);
  }
  
  return this;
};
File.fn = File.prototype = {
  read: function(files){
    var buffers = [];
    // Read each file synchronously as an ArrayBuffer and
    // stash it in a global array to return to the main app.
    [].forEach.call(files, function(file) {
      var reader = new FileReaderSync();
      buffers.push(reader.readAsDataURL(file));
    });
  
    postMessage(buffers);
  }
};