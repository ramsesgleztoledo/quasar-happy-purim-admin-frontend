import Dexie, { type Table } from 'dexie';
import type { CacheItemInterface } from './api-interfaces';

const db = new Dexie('CacheDB');

db.version(1).stores({
  cache: 'key, timestamp',
});

export const cache: Table<CacheItemInterface, string> = db.table('cache');
