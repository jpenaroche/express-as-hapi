import {Db} from 'mongodb';
import {mongo} from '@lib';

export interface ITask {
  name: string;
  description: string;
  when: Date;
}

export default class TaskService extends mongo.BaseService<ITask> {
  constructor(client: Db) {
    super(client, 'tasks');
  }
}
