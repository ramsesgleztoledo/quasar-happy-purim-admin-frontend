/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Table } from 'dexie';
import type { CacheItemInterface, ExtraOptionsInterface } from './api-interfaces';
import Dexie from 'dexie';

class CacheDB extends Dexie {
  cache!: Table<CacheItemInterface>;
  constructor() {
    super('CacheDB');
    this.version(1).stores({
      cache: 'key, timestamp'
    });
  }
}

const db = new CacheDB();

db.version(1).stores({
  cache: 'key, timestamp'
});

const saveInCache = async (key: string, data: any) => {
  const timestamp = Date.now();
  await db.cache.put({
    key,
    data,
    timestamp
  });
}

export const fetchWithCache = async <T>(
  key: string,
  fetchFunction: () => Promise<T>,
  extraOptions?: ExtraOptionsInterface | undefined | null)
  : Promise<T> => {

  try {
    const ttl = (extraOptions?.ttl ? extraOptions?.ttl : 20) * 60 * 1000;
    const cached = await db.cache.get(key);
    const now = Date.now();

    if (
      extraOptions?.useCache &&
      cached &&
      (now - cached.timestamp) < ttl
    ) {
      const cachedData: T = cached.data

      return cachedData;
    }

    const data: T = await fetchFunction()
    await saveInCache(key, data)

    return data
  }

  catch (error) {
    console.error(error);
    throw error
  }
}













