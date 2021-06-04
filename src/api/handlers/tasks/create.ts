import {Request, Response} from 'express';
import {TaskService} from '../../services';
import {ITask} from '../../repositories';
import {IContext} from 'main';

export default async (
  ctx: IContext,
  req: Request,
  res: Response
): Promise<Response<ITask | null>> => {
  const service = new TaskService(ctx.mongoClient);
  const task = await service.create(req.body.task);
  return res.status(201).json(task);
};
