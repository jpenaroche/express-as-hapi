import {repository} from '@lib';
import {Db} from 'mongodb';

export interface ITask {
  name: string;
  description: string;
  when: Date;
}

export class TaskRepository extends repository.BaseRepository<ITask> {
  constructor(client: Db) {
    super(client, 'tasks');
  }
}
