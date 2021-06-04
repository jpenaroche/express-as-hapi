import {Db, FilterQuery} from 'mongodb';
import {ITask, TaskRepository} from '../repositories';

export default class TaskService {
  protected repository;
  constructor(client: Db) {
    this.repository = new TaskRepository(client);
  }

  list(query: FilterQuery<ITask>) {
    return this.repository.find(query);
  }

  get(id: string) {
    return this.repository.findById(id);
  }

  del(id: string) {
    return this.repository.deleteOne(id);
  }

  create(data: ITask) {
    return this.repository.create(data);
  }
}
