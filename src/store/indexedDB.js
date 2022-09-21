function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

function openDB() {
  const openRequest = indexedDB.open('store', 2);

  openRequest.onupgradeneeded = (event) => {
    console.log('onupgradeneeded', event.oldVersion);
    const db = openRequest.result;
    const tx = openRequest.transaction;

    /* eslint-disable no-fallthrough */
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
      case 1:
        tx.objectStore('documents').createIndex('taskId', 'taskId');
        tx.objectStore('comments').createIndex('taskId', 'taskId');
    }
    /* eslint-enable no-fallthrough */
  };

  return requestToPromise(openRequest);
}

const dbPromise = openDB();

export default function store(storeName) {
  async function request(cb, write = true) {
    const db = await dbPromise;
    const transaction = db.transaction(storeName, write ? 'readwrite' : 'readonly');
    const store = transaction.objectStore(storeName);
    const request = cb(store);
    return requestToPromise(request);
  }

  function add(data, key) {
    return request(store => store.add(data, key));
  }

  function put(data, key) {
    return request(store => store.put(data, key));
  }

  function del(key) {
    return request(store => store.delete(key));
  }

  function get(key) {
    return request(store => store.get(key), false);
  }

  function getAll() {
    return request(store => store.getAll(), false);
  }

  function getAllFromIndex(indexName, key) {
    return request(store => store.index(indexName).getAll(key), false);
  }

  return {
    request,
    add,
    put,
    del,
    get,
    getAll,
    getAllFromIndex,
  };
}
