import { ILog, IResponse } from '../common/models';
import { CapacitorStorageAdapter } from './adapter';
declare let loki;

let logsColl: Collection<ILog>;

const capacitorStorageAdapter = new CapacitorStorageAdapter();

const lokiOptions: Partial<LokiConfigOptions> = {
  autosave: true,
  autoload: true,
  adapter: capacitorStorageAdapter,
  autoloadCallback: () => {
    if (!logsColl) {
      logsColl = prunusDB.addCollection<ILog>('logs');
    } else {
      logsColl = prunusDB.getCollection<ILog>('logs');
    }
  }
};

let prunusDB: Loki = new loki('prunus.db', lokiOptions);

export function getLogsView(): Promise<DynamicView<ILog>> {
  return new Promise((resolve, reject) => {
    let count = 0;
    setInterval(() => {
      if (logsColl) {
        resolve(logsColl.addDynamicView('logs'));
      } else if (count === 30) {
        reject(`Couldn't create database on device.`)
      }
    }, 1000);
  });
}

export function getLogs(date) {
  let response: IResponse<number> = {
    success: false,
    error: null,
    data: undefined,
    dateStamp: new Date().toString()
  };
  try {
    const record = logsColl.find({
      date: {
        $eq: date
      }
    });
    if (record) {
      response = {
        ...response,
        success: true,
        data: record.length
      };
      return response;
    } else {
      response = {
        ...response,
        error: 'There were no records on DB for this date.'
      };
      return response;
    }
  } catch (error) {
    if (logsColl) {
      console.error(error);
    }
    response = {
      ...response,
      success: true,
      data: -1
    };
    return response;
  }
}

export function insert(log: ILog) {
  let response: IResponse<null> = {
    success: false,
    error: null,
    data: undefined,
    dateStamp: new Date().toString()
  };
  const results = logsColl.findOne({
    date: {
      $eq: log.date
    },
    time: {
      $eq: log.time
    }
  });
  if (results) {
    response = {
      ...response,
      error: 'Entry is already on DB in the database.'
    };
  } else {
    logsColl.insertOne(log);
    response = {
      ...response,
      success: true
    };
  }
  return response;
}


export function update(log: ILog) {
  let response: IResponse<string> = {
    success: false,
    error: null,
    data: undefined,
    dateStamp: new Date().toString()
  };
  const results = logsColl.findOne({
    date: {
      $eq: log.date
    },
    time: {
      $eq: log.time
    }
  });
  try {
    if (results) {
      logsColl.update(log);
      response = {
        ...response,
        success: true
      };
    } else {
      logsColl.insertOne(log);
      response = {
        ...response,
        success: true
      };
    }
  } catch (error) {
    response = {
      ...response,
      error: error
    };
  }
  return response;
}

export function remove(log: LokiObj & ILog): IResponse<DynamicView<ILog>> {
  let response: IResponse<DynamicView<ILog>> = {
    success: false,
    error: null,
    data: undefined,
    dateStamp: new Date().toString()
  };
  const results = logsColl.findOne({
    $loki: {
      $eq: log.$loki
    }
  });
  if (results) {
    logsColl.remove(results);
    response = {
      ...response,
      success: true,
      error: null,
      data: logsColl.addDynamicView('logs')
    };
  } else {
    response = {
      ...response,
      error: 'This record doesn\'t exist on database.',
      data: logsColl.addDynamicView('logs')
    };
  }
  return response;
}

export function clear(): IResponse<DynamicView<ILog>> {
  let response: IResponse<undefined> = {
    success: false,
    error: null,
    data: undefined,
    dateStamp: new Date().toString()
  };
  try {
    logsColl.clear();
    response = {
      ...response,
      success: true,
      error: null
    };
  } catch (error) {
    response = {
      ...response,
      error: error
    };
  }
  return response;
}
