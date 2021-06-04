import {
  Collection,
  Db,
  FilterQuery,
  MongoClient,
  ObjectId,
  OptionalId,
  SortOptionObject,
} from 'mongodb';

export interface IRestAPI<T> {
  find: (query: FilterQuery<T>, sort?: SortOptionObject<T>) => Promise<T[]>;
  findOne: (query: FilterQuery<T>) => Promise<T | null>;
  findById: (id: string) => Promise<T | null>;
  count?: (query: FilterQuery<T>) => Promise<number>;
  create?: (data: OptionalId<T>) => Promise<void>;
  createMany?: (data: OptionalId<T>[]) => Promise<void>;
  deleteOne: (id: string) => Promise<void>;
  delete: (query: FilterQuery<T>) => Promise<void>;
}

export type AsDocument<T> = {_id?: any} & T;

export class BaseService<T> implements IRestAPI<T> {
  public name: string;
  protected collection: Collection<T>;
  constructor(client: Db, name: string) {
    if (!name) {
      throw new Error('Must define a collection name');
    }
    this.name = name;
    this.collection = client.collection(this.name);
  }
  async findOne(query: FilterQuery<T>) {
    return this.collection.findOne(query);
  }
  async findById(id: string) {
    return this.collection.findOne({_id: new ObjectId(id)} as FilterQuery<{
      _id: ObjectId;
    }>);
  }
  async find(
    query: FilterQuery<T>,
    sort: SortOptionObject<T> = {}
  ): Promise<T[]> {
    return this.collection
      .find(query, {
        sort,
      })
      .toArray();
  }
  async count(query: FilterQuery<T>): Promise<number> {
    return this.collection.countDocuments(query);
  }
  async create(data: OptionalId<T>): Promise<AsDocument<T>['_id']> {
    return (await this.collection.insertOne(data)).insertedId;
  }
  async createMany(data: OptionalId<T>[]): Promise<AsDocument<T>['_id']> {
    return (await this.collection.insertMany(data)).insertedIds;
  }
  async deleteOne(id: string): Promise<void> {
    this.collection.deleteOne({_id: new ObjectId(id)} as FilterQuery<{
      _id: ObjectId;
    }>);
  }
  async delete(query: FilterQuery<T>): Promise<void> {
    this.collection.deleteMany(query);
  }
}

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
  return (await client.connect()).db(db_name);
};
