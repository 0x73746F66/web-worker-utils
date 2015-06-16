var DB = function(worker, name, version) {
  var that = this;
  that.db;
  that.name = name;
  that.version = version || 1;
  worker.indexedDB = worker.indexedDB || worker.webkitIndexedDB || worker.mozIndexedDB || worker.msIndexedDB;
  // DON'T use "var indexedDB = ..." if you're not in a function.
  // Moreover, you may need references to some IDB* objects:
  worker.IDBTransaction = worker.IDBTransaction || worker.webkitIDBTransaction || worker.msIDBTransaction;
  worker.IDBKeyRange = worker.IDBKeyRange || worker.webkitIDBKeyRange || worker.msIDBKeyRange;
  // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
  // Let us open our database
  var DBOpenRequest = worker.indexedDB.open(name, version);
  
  // these two event handlers act on the database being opened successfully, or not
  DBOpenRequest.onerror = function(e) {
    worker.postMessage('Error loading database.');
  };
  
  DBOpenRequest.onsuccess = function(e) {
    worker.postMessage('Database initialised.');
    // store the result of opening the database in the db variable. This is used a lot below
    that.db = DBOpenRequest.result;
  };

  // This event handles the event whereby a new version of the database needs to be created
  // Either one has not been created before, or a new version number has been submitted via the
  // indexedDB.open line above
  //it is only implemented in recent browsers
  DBOpenRequest.onupgradeneeded = function(e) { 
    var db = e.target.result;
    db.onerror = function(e) {
      worker.postMessage('Error loading database.');
    };
    // Create an objectStore for this database
    var objectStore = db.createObjectStore(name, { keyPath: 'id', autoIncrement: true });
    // define what data items the objectStore will contain
    objectStore.createIndex("hours", "hours", { unique: false });
    objectStore.createIndex("minutes", "minutes", { unique: false });
    objectStore.createIndex("day", "day", { unique: false });
    objectStore.createIndex("month", "month", { unique: false });
    objectStore.createIndex("year", "year", { unique: false });
    objectStore.createIndex("notified", "notified", { unique: false });
    
    worker.postMessage('Object store created.');
  };
  
  return this;
};
DB.fn = DB.prototype = {
  add: function(newItem) {
    var that = this;

    // open a read/write db transaction, ready for adding the data
    var transaction = that.modules['DB'].db.transaction([that.modules['DB'].name], "readwrite");
    // report on the success of opening the transaction
    transaction.oncomplete = function() {
      that.postMessage('Transaction completed: database add finished.');
    };
    transaction.onerror = function() {
      that.postMessage('Transaction not opened due to error: ' + transaction.error + '');
    };
    // call an object store that's already been added to the database
    var objectStore = transaction.objectStore(that.modules['DB'].name);

    // add our newItem object to the object store
    var objectStoreRequest = objectStore.add(newItem);        
      objectStoreRequest.onsuccess = function(e) {
      // report the success of our new item going into the database
      that.postMessage('New item added to database.');
    };
  },
  get: function(id) {
    var that = this;

    // open a read/write db transaction, ready for adding the data
    var transaction = that.modules['DB'].db.transaction([that.modules['DB'].name], "readwrite");
    // report on the success of opening the transaction
    transaction.oncomplete = function() {
      that.postMessage('Transaction completed: database get finished.');
    };
    transaction.onerror = function() {
      that.postMessage('Transaction not opened due to error: ' + transaction.error + '');
    };
    // call an object store that's already been added to the database
    var objectStore = transaction.objectStore(that.modules['DB'].name);
    // Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
    objectStore.openCursor().onsuccess = function(e) {
      var cursor = e.target.result;
      // if there is still another cursor to go, keep runing this code
      if(cursor) {
        // if there are no more cursor items to iterate through, say so, and exit the function 
        if (cursor.value.id === id) {
          that.postMessage(['displaying id:' + id, cursor.value]);
          return;
        } else {
          // continue on to the next item in the cursor
          cursor.continue();
        }
      }
    }
  },
  update: function() {
  },
  delete: function(id) {
    var that = this;

    // open a read/write db transaction, ready for adding the data
    var transaction = that.modules['DB'].db.transaction([that.modules['DB'].name], "readwrite");
    // report on the success of opening the transaction
    transaction.oncomplete = function() {
      that.postMessage('Transaction completed: database delete finished.');
    };
    transaction.onerror = function() {
      that.postMessage('Transaction not opened due to error: ' + transaction.error + '');
    };
    // call an object store that's already been added to the database
    transaction.objectStore(that.modules['DB'].name).delete(id);
  },
  list: function() {
    var that = this,
        items = [];

    // open a read/write db transaction, ready for adding the data
    var transaction = that.modules['DB'].db.transaction([that.modules['DB'].name], "readwrite");
    // report on the success of opening the transaction
    transaction.oncomplete = function() {
      that.postMessage('Transaction completed: database list finished.');
    };
    transaction.onerror = function() {
      that.postMessage('Transaction not opened due to error: ' + transaction.error + '');
    };
    // call an object store that's already been added to the database
    var objectStore = transaction.objectStore(that.modules['DB'].name);
    // Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
    objectStore.openCursor().onsuccess = function(e) {
      var cursor = e.target.result;
      // if there is still another cursor to go, keep runing this code
      if(cursor) {
        items.push(cursor.value);
        // continue on to the next item in the cursor
        cursor.continue();
        // if there are no more cursor items to iterate through, say so, and exit the function 
      } else {
        that.postMessage(['Entries all displayed.', items]);
      }
    }
  }
};