import {Request, Response} from 'express';
import {ITask, TaskService} from '../../services';
import {IContext} from 'main';

export default async (
  ctx: IContext,
  req: Request,
  res: Response
): Promise<Response<ITask[]>> => {
  const service = new TaskService(ctx.mongoClient);
  return res.json(await service.find({}));
};
