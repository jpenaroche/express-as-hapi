require('module-alias/register');
import {run} from './server';
import {error} from '@lib';
import {mongo} from '@lib';
import {Db} from 'mongodb';
import * as config from '@config';

export interface IContext {
  // Include new external drivers
  mongoClient: Db;
  config: typeof config;
}

export const bootstrap = async (): Promise<IContext> => {
  const mongoClient = await mongo.getClient(
    config.database as mongo.IMongoParams
  );
  return {
    mongoClient,
    config,
  };
};

// Bootstrap all connections and send it to server using context definition
bootstrap().then(run);

// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', (err: Error) => {
  error.ErrorHandler.handleError(err);
  if (!error.ErrorHandler.isTrustedError(err)) {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
});
