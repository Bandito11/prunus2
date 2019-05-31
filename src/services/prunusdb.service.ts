import { ILog, IResponse } from '../common/models';
import { CapacitorStorageAdapter } from './adapter';
declare let loki;

/**
 * Collections
 */
export let logsColl: Collection<ILog>;

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

let prunusDB: Loki = new loki('prunus.db', lokiOptions);;

export function getLogsView(): DynamicView<ILog> {
  try {
    return logsColl.addDynamicView('logs');
  } catch (error) {
    return undefined;
  }
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
        error: 'There was no record on DB for this date'
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
      error: 'Cannot add log already created in the database.'
    };
  } else {
    logsColl.insertOne(log);
    response = {
      ...response,
      success: true
    };
  }
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
        success: true,
        data: 'Log was updated successfully!'
      };
    } else {
      logsColl.insertOne(log);
      response = {
        ...response,
        success: true,
        data: 'Log was added to Database successfully!'
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

export function remove(log: LokiObj): IResponse<DynamicView<ILog>> {
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
      error: 'Log was removed successfully!',
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
