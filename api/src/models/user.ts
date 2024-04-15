import path from 'path';
import { EventEmitter } from 'events';
import util from 'util';
import { DataStore } from '@nedb/core';

const dataDir = process.env.BLOCKLET_DATA_DIR || './';

type User = Pick<SessionType['session']['user'], 'did' | 'email' | 'fullName' | 'phone'>;

class BaseState extends EventEmitter {
  filename: string;

  db: InstanceType<typeof DataStore<User>>;

  asyncDb: InstanceType<typeof DataStore<User>>;

  constructor(baseDir: string, options: Partial<Record<'filename' | 'db', string>>) {
    super();
    const dbOptions = options.db || {};
    this.filename = path.join(baseDir, options.filename!);
    this.db = new DataStore({
      filename: this.filename,
      timestampData: true,
      autoload: true,
      ...dbOptions,
    });

    this.asyncDb = new Proxy(this.db, {
      get(target, property) {
        return util.promisify(target[property as keyof typeof target]).bind(target);
      },
    });
  }
}

export default new BaseState(dataDir, {
  filename: 'user.db',
});
