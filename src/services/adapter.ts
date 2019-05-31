// import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

// const { Filesystem } = Plugins;

// declare const localforage;

// // Implement the driver here.
// const fileDriver = {
//     _driver: 'capacitorFileDriver',
//     _initStorage: function (options) {
//         options;
//     },
//     clear: async function (callback) {
//         await Filesystem.deleteFile({
//             path: 'db/app.db',
//             directory: FilesystemDirectory.Application
//           });
//           callback(null);
//     },
//     getItem: async function (key, callback) {
//         const contents = await Filesystem.readFile({
//             path: `db/${key}.db`,
//             directory: FilesystemDirectory.Application,
//             encoding: FilesystemEncoding.UTF8
//         });
//         callback(contents);

//     },
//     iterate: function (iteratorCallback, successCallback) {
//         iteratorCallback();
//         successCallback();
//     },
//     key: function (n, callback) {
//         callback(n);
//     },
//     keys: function (callback) {
//         callback(null);
//     },
//     length: function (callback) {
//         callback(null);
//     },
//     removeItem: async function (key, callback) {
//         await Filesystem.deleteFile({
//             path: `.db/${key}.txt`,
//             directory: FilesystemDirectory.Application
//         });
//         callback(null);
//     },
//     setItem: function (key, value, callback) {
//         try {
//             Filesystem.writeFile({
//                 path: `db/${key}.txt`,
//                 data: value,
//                 directory: FilesystemDirectory.Application,
//                 encoding: FilesystemEncoding.UTF8
//             })
//         } catch (e) {
//             console.error('Unable to write file', e);
//         }
//         callback(null);
//     }
// }

// // Add the driver to localForage.
// localforage.defineDriver(fileDriver);

// localforage.setDriver([
//     localforage.fileDriver,
//     localforage.INDEXEDDB, 
//     localforage.WEBSQL, 
//     localforage.LOCALSTORAGE
// ]);


// class Storage {

//     get(item) {
//         return new Promise((resolve) => {
//             const response = localforage.getItem(item);
//             if (response) {
//                 resolve(response);
//             }
//             resolve(response);
//         });
//     }

//     set(item, value) {
//         return new Promise(resolve => {
//             try {
//                 localforage.setItem(item, value);
//             } catch (error) {
//                 resolve(error);
//             }
//         });
//     }

//     remove(item) {
//         return new Promise(resolve => {
//             try {
//                 localforage.removeItem(item);
//             } catch (error) {
//                 resolve(error);
//             }
//         });
//     }

// }

import { CapacitorDataStorageSqlite } from 'capacitor-data-storage-sqlite';

const storage = CapacitorDataStorageSqlite;
/**
 * A loki persistence adapter which persists to web browser's local storage object
 * @constructor IonicStorageAdapter
 */
export function CapacitorStorageAdapter() { }

/**
 * loadDatabase() - Load data from IonicStorage
 * @param {string} dbname - the name of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof IonicStorageAdapter
 */
CapacitorStorageAdapter.prototype.loadDatabase = function loadDatabase(dbname, callback) {
    storage.get({ key: dbname })
        .then(data => {
            callback(data.value);
        });
};

/**
 * saveDatabase() - save data to IonicStorage, will throw an error if the file can't be saved
 * might want to expand this to avoid dataloss on partial save
 * @param {string} dbname - the filename of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof IonicStorageAdapter
 */
CapacitorStorageAdapter.prototype.saveDatabase = function saveDatabase(dbname, dbstring, callback) {
    storage.set({ key: dbname, value: dbstring });
    callback(null);
};

/**
 * deleteDatabase() - delete the database from IonicStorage, will throw an error if it
 * can't be deleted
 * @param {string} dbname - the filename of the database to delete
 * @param {function} callback - the callback to handle the result
 * @memberof IonicStorageAdapter
 */
CapacitorStorageAdapter.prototype.deleteDatabase = function deleteDatabase(dbname, callback) {
    storage.remove({ key: dbname });
    callback(null);
};
