import * as redis from "redis";
import Logger from "./winston-logger";

export default class Redis {
  private redisClient: redis.redisClient;

  constructor(port: number) {
    this.redisClient = redis.createClient({ host: "127.0.0.1", port: "6379" });
  }

  public set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      Logger.info("Error in redis write: ", null);
      return this.redisClient.set(key, value, (err: Error) => {
        if (err) {
          Logger.info("Error in redis write: ", {
            message: JSON.stringify(err),
          });
          Logger.info("Error in redis write: ", null);
          return reject(err);
        }
        Logger.info("done redis write:", null);
        return resolve();
      });
    });
  }

  public setExp(
    key: string,
    value: string,
    mode: string,
    duration: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.redisClient.set(key, value, mode, duration, (err: Error) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

  public del(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.redisClient.del(key, (err: Error) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

  public get(key: string): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      return this.redisClient.get(key, (err: Error, jsonDecode?: string) => {
        if (err) {
          return reject(err);
        }
        return resolve(jsonDecode);
      });
    });
  }
}
