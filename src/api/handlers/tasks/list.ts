import {Request, Response} from 'express';
import {TaskService} from '../../services';
import {ITask} from '../../repositories';
import {IContext} from 'main';

export default async (
  ctx: IContext,
  req: Request,
  res: Response
): Promise<Response<ITask[]>> => {
  const service = new TaskService(ctx.mongoClient);
  return res.json(await service.list({}));
};
