import {Request, Response} from 'express';
import {ITask, TaskService} from '../../services';
import {IContext} from 'main';
import {errors} from '@lib';

export default async (
  ctx: IContext,
  req: Request,
  res: Response
): Promise<Response<ITask | null>> => {
  const id = req.params.id;
  const service = new TaskService(ctx.mongoClient);
  const task = await service.findById(id);
  if (!task)
    throw new errors.NotFoundError(`There is no task with id: "${id}"`);
  await service.deleteOne(id);

  return res.json({id});
};
