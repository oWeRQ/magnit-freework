export default new Promise((resolve, reject) => {
  const openRequest = indexedDB.open('store', 2);

  openRequest.onupgradeneeded = (event) => {
    console.log('onupgradeneeded', event.oldVersion);
    const db = openRequest.result;
    const tx = openRequest.transaction;

    switch (event.oldVersion) {
      case 0:
        db.createObjectStore('tasks', {
          keyPath: 'id',
          autoIncrement: true,
        });
        db.createObjectStore('documents', {
          keyPath: 'id',
          autoIncrement: true,
        });
        db.createObjectStore('comments', {
          keyPath: 'id',
          autoIncrement: true,
        });
      // eslint-disable-next-line no-fallthrough
      case 1:
        tx.objectStore('documents').createIndex('taskId', 'taskId');
        tx.objectStore('comments').createIndex('taskId', 'taskId');
    }
  };

  openRequest.onerror = () => {
    reject(openRequest.error);
  };

  openRequest.onsuccess = () => {
    const db = openRequest.result;

    function request(storeName, cb, write = true) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, write ? 'readwrite' : 'readonly');
        const store = transaction.objectStore(storeName);
        const request = cb(store);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    }

    function add(storeName, data) {
      return request(storeName, store => store.add(data));
    }

    function put(storeName, data) {
      return request(storeName, store => store.put(data));
    }

    function deleteKey(storeName, key) {
      return request(storeName, store => store.delete(key));
    }

    function get(storeName, key) {
      return request(storeName, store => store.get(key), false);
    }

    function getAll(storeName) {
      return request(storeName, store => store.getAll(), false);
    }

    function getAllFromIndex(storeName, indexName, key) {
      return request(storeName, store => store.index(indexName).getAll(key), false);
    }

    resolve({
      db,
      request,
      add,
      put,
      deleteKey,
      get,
      getAll,
      getAllFromIndex,
    });
  };
});
