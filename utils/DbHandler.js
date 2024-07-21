/**
 * Plugins
 */
import {useEffect} from 'react';
import {
  openDatabase,
  SQLiteDatabase,
  enablePromise,
} from 'react-native-sqlite-storage';

/**
 * Utils
 */

enablePromise(true);

// Database Name
export const openDbConnection = async () => {
  return await openDatabase({name: 'PetCare.db', location: 'default'});
};

export const getConnection = async () => {
  const db = await openDbConnection();
  return db;
};

export const createLoginTable = async db => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS loginTable (
            ID INTEGER PRIMARY KEY AUTOINCREMENT, BDEPID TEXT COLLATE NOCASE , USERNAME TEXT COLLATE NOCASE, PASSWORD TEXT COLLATE NOCASE, 
            CURFY TEXT, COMPNAME TEXT, UID TEXT, SERVICEURL TEXT, COMPINFOJSON TEXT, USERRIGHTSJSON TEXT, FYLISTJSON TEXT, DEVICEID TEXT
    );`;

    const query1 = `CREATE TABLE IF NOT EXISTS lastLoginTable (
        ID INTEGER PRIMARY KEY AUTOINCREMENT, BDEPID TEXT COLLATE NOCASE , USERNAME TEXT COLLATE NOCASE, PASSWORD TEXT COLLATE NOCASE, 
        CURFY TEXT, COMPNAME TEXT, UID TEXT
    );`;
    const result = await db.executeSql(query);
    const result1 = await db.executeSql(query1);

    // if (__DEV__) {
    //     console.log('Login Table Created', result);
    //     console.log('Last LoginTable Created', result1);
    // }
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
    customEvent(
      'catchLogs',
      `dBHander_${arguments.callee.name}_Log: ${e.message}`,
    );
  }
};

export const insertDataIntoLoginTable = async (
  db,
  bdepid,
  username,
  password,
  curfy,
  compName,
  uid,
  serviceurl,
  compJSON,
  userRightsJSON,
  fyListJSON,
  deviceId,
) => {
  try {
    await db.transaction(async tx => {
      await tx.executeSql(
        'INSERT INTO loginTable (BDEPID, USERNAME, PASSWORD, CURFY, COMPNAME, UID, SERVICEURL, COMPINFOJSON, USERRIGHTSJSON, FYLISTJSON, DEVICEID) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [
          makeQryStr(bdepid),
          makeQryStr(username),
          makeQryStr(password),
          curfy,
          compName,
          uid,
          serviceurl,
          compJSON,
          userRightsJSON,
          fyListJSON,
          deviceId,
        ],
      );
      // if (__DEV__) {
      //     console.log('Data Inserted.');
      // }
    });
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
    customEvent(
      'catchLogs',
      `dBHander_${arguments.callee.name}_Log: ${e.message}`,
    );
  }
};

export const fetchAllDataFromLoginTable = async db => {
  const loginDetails = [];
  try {
    const results = await db.executeSql(
      'SELECT * FROM loginTable ORDER BY 1 DESC',
      [],
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const row = result.rows.item(index);
        loginDetails.push(row);
      }
    });

    return loginDetails;
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
    customEvent(
      'catchLogs',
      `dBHander_${arguments.callee.name}_Log: ${e.message}`,
    );
  }
};

export const updateDataIntoLoginTable = (
  db,
  bdepid,
  username,
  password,
  curfy,
  compName,
  uid,
  serviceurl,
  compJSON,
  userRightsJSON,
  fyListJSON,
  deviceId,
) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE loginTable set BDEPID=?, USERNAME=? , PASSWORD=? , CURFY=? , COMPNAME=? , UID=? , SERVICEURL=? , COMPINFOJSON=?, USERRIGHTSJSON=?, FYLISTJSON=?, DEVICEID=? WHERE BDEPID=? AND UID=? ',
        [
          makeQryStr(bdepid),
          makeQryStr(username),
          makeQryStr(password),
          curfy,
          compName,
          uid,
          serviceurl,
          compJSON,
          userRightsJSON,
          fyListJSON,
          deviceId,
          makeQryStr(bdepid),
          // makeQryStr(username),
          uid,
        ],
        () => {
          // if (__DEV__) {
          //     console.log('Data Updated.');
          // }
        },
        error => {
          if (__DEV__) {
            console.log(error);
          }
        },
      );
    });
  } catch (error) {
    if (__DEV__) {
      console.log(error);
    }
    customEvent(
      'catchLogs',
      `dBHander_${arguments.callee.name}_Log: ${e.message}`,
    );
  }
};

export const deleteAllDataFromLoginTable = (db, bdepid) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM loginTable WHERE BDEPID =?',
        [makeQryStr(bdepid)],
        () => {
          if (__DEV__) {
            console.log('All LoginData Deleted');
          }
        },
        error => {
          if (__DEV__) {
            console.log(error);
          }
        },
      );
    });
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
    customEvent(
      'catchLogs',
      `dBHander_${arguments.callee.name}_Log: ${e.message}`,
    );
  }
};
