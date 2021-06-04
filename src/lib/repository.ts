import {
  Collection,
  Db,
  FilterQuery,
  ObjectId,
  OptionalId,
  SortOptionObject,
} from 'mongodb';

export interface IRepository<T> {
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

export class BaseRepository<T> implements IRepository<T> {
  public name: string;
  protected collection: Collection<T>;
  constructor(client: Db, name: string) {
    if (!name) {
      throw new Error('Must define a collection name');
    }
    this.name = name;
    this.collection = client.collection<T>(this.name);
  }
  async findOne(query: FilterQuery<T>) {
    return this.collection.findOne(query);
  }
  async findById(id: string) {
    const query: FilterQuery<{_id: ObjectId}> = {_id: new ObjectId(id)};
    return this.collection.findOne(query);
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
    const query: FilterQuery<{_id: ObjectId}> = {_id: new ObjectId(id)};
    this.collection.deleteOne(query);
  }
  async delete(query: FilterQuery<T>): Promise<void> {
    this.collection.deleteMany(query);
  }
}
