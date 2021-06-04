import {Request, Response} from 'express';
import {error} from '@lib';
import {TaskService} from '../../services';
import {ITask} from '../../repositories';
import {IContext} from 'main';

export default async (
  ctx: IContext,
  req: Request,
  res: Response
): Promise<Response<ITask | null>> => {
  const service = new TaskService(ctx.mongoClient);
  const task = await service.get(req.params.id);
  if (!task)
    throw new error.NotFoundError(
      `There is no task with id: "${req.params.id}"`
    );
  return res.json({task});
};
