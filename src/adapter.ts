import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;

declare const localforage;

// Implement the driver here.
const fileDriver = {
    _driver: 'capacitorFleDriver',
    _initStorage: function (options) {
        options;
    },
    clear: async function (callback) {
        await Filesystem.deleteFile({
            path: 'secrets/text.txt',
            directory: FilesystemDirectory.Documents
          });
          callback(null);
    },
    getItem: async function (key, callback) {
        const contents = await Filesystem.readFile({
            path: `db/${key}.txt`,
            directory: FilesystemDirectory.Documents,
            encoding: FilesystemEncoding.UTF8
        });
        callback(contents);

    },
    iterate: function (iteratorCallback, successCallback) {
        iteratorCallback();
        successCallback();
    },
    key: function (n, callback) {
        callback(n);
    },
    keys: function (callback) {
        callback(null);
    },
    length: function (callback) {
        callback(null);
    },
    removeItem: async function (key, callback) {
        await Filesystem.deleteFile({
            path: `.db/${key}.txt`,
            directory: FilesystemDirectory.Documents
        });
        callback(null);
    },
    setItem: function (key, value, callback) {
        try {
            Filesystem.writeFile({
                path: `db/${key}.txt`,
                data: value,
                directory: FilesystemDirectory.Documents,
                encoding: FilesystemEncoding.UTF8
            })
        } catch (e) {
            console.error('Unable to write file', e);
        }
        callback(null);
    }
}

// Add the driver to localForage.
localforage.defineDriver(fileDriver);

localforage.setDriver([
    localforage.fileDriver,
    localforage.INDEXEDDB, 
    localforage.WEBSQL, 
    localforage.LOCALSTORAGE
]);


class Storage {

    get(item) {
        return new Promise((resolve) => {
            const response = localforage.getItem(item);
            if (response) {
                resolve(response);
            }
            resolve(response);
        });
    }

    set(item, value) {
        return new Promise(resolve => {
            try {
                localforage.setItem(item, value);
            } catch (error) {
                resolve(error);
            }
        });
    }

    remove(item) {
        return new Promise(resolve => {
            try {
                localforage.removeItem(item);
            } catch (error) {
                resolve(error);
            }
        });
    }

}

const storage = new Storage();
/**
 * A loki persistence adapter which persists to web browser's local storage object
 * @constructor IonicStorageAdapter
 */
export function IonicStorageAdapter() { }

/**
 * loadDatabase() - Load data from IonicStorage
 * @param {string} dbname - the name of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof IonicStorageAdapter
 */
IonicStorageAdapter.prototype.loadDatabase = function loadDatabase(dbname, callback) {
    storage.get(dbname)
        .then(value => {
            callback(value);
        });
};

/**
 * saveDatabase() - save data to IonicStorage, will throw an error if the file can't be saved
 * might want to expand this to avoid dataloss on partial save
 * @param {string} dbname - the filename of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof IonicStorageAdapter
 */
IonicStorageAdapter.prototype.saveDatabase = function saveDatabase(dbname, dbstring, callback) {
    storage.set(dbname, dbstring);
    callback(null);
};

/**
 * deleteDatabase() - delete the database from IonicStorage, will throw an error if it
 * can't be deleted
 * @param {string} dbname - the filename of the database to delete
 * @param {function} callback - the callback to handle the result
 * @memberof IonicStorageAdapter
 */
IonicStorageAdapter.prototype.deleteDatabase = function deleteDatabase(dbname, callback) {
    storage.remove(dbname);
    callback(null);
};
