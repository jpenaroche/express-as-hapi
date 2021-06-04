import {Db, MongoClient} from 'mongodb';
import {logger} from './logger';

export type IMongoParams = {
  db_name: string;
  db_password: string;
  db_user: string;
};

export const getClient = async (parameters: IMongoParams): Promise<Db> => {
  const {db_password, db_user, db_name} = parameters;
  const uri = `mongodb+srv://${db_user}:${db_password}@sandbox.ayybd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  logger.info('Connecting to MongoAtlas');
  return (await client.connect()).db(db_name);
};
