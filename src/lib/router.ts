import {NextFunction, Request, Response, Router} from 'express';
import {middleware} from '@lib';
import {IContext} from 'main';

type IHttpVerbs = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'all';

type IRouteParameter<TResponse> = {
  method: IHttpVerbs;
  path: string;
  validator?: middleware.validator.TValidation;
  handler: (ctx: IContext, req: Request, res: Response) => Promise<TResponse>;
};

export type IRouterParameters = {
  prefix?: string;
  routes: IRouteParameter<unknown> | IRouteParameter<unknown>[];
};

type TRouterBinder = {
  getRouter: () => Router;
  addRoutes: (parameters: IRouterParameters[]) => TRouterBinder;
};

const wrap =
  (ctx: IContext, fn: (ctx: IContext, req: Request, res: Response) => any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(ctx, req, res);
    } catch (e) {
      next(e);
    }
  };

export const bind = (router: Router, ctx: IContext): TRouterBinder => ({
  getRouter: () => router,
  addRoutes: (parameters: IRouterParameters[]) => {
    for (const {routes, prefix} of parameters) {
      const parameters = [routes].flat();
      for (const {method, path, handler, validator} of parameters) {
        const fullPath = prefix + path;
        if (validator) {
          router[method](
            fullPath,
            middleware.validator.bind(validator),
            wrap(ctx, handler)
          );
        } else router[method](fullPath, wrap(ctx, handler));
      }
    }
    return bind(router, ctx);
  },
});
