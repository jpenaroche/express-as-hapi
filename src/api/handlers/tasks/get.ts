import {Request, Response} from 'express';
import {errors} from '@lib';
import {ITask, TaskService} from '../../services';
import {IContext} from 'main';

export default async (
  ctx: IContext,
  req: Request,
  res: Response
): Promise<Response<ITask | null>> => {
  const service = new TaskService(ctx.mongoClient);
  const task = await service.findById(req.params.id);
  if (!task)
    throw new errors.NotFoundError(
      `There is no task with id: "${req.params.id}"`
    );
  return res.json({task});
};
