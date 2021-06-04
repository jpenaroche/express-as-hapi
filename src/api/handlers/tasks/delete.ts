import {Request, Response} from 'express';
import {TaskService} from '../../services';
import {ITask} from '../../repositories';
import {IContext} from 'main';
import {error} from '@lib';

export default async (
  ctx: IContext,
  req: Request,
  res: Response
): Promise<Response<ITask | null>> => {
  const id = req.params.id;
  const service = new TaskService(ctx.mongoClient);
  const task = await service.get(id);
  if (!task) throw new error.NotFoundError(`There is no task with id: "${id}"`);
  await service.del(id);

  return res.json({id});
};
