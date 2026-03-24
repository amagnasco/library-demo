import { Router, Request, Response, NextFunction } from 'express'

export type Handler = (req: Request, res: Response, next: NextFunction) => any

export interface RouteDef {
    method: 'get' | 'post' | 'patch' | 'delete'
    path: string
    handler: Handler
}

export function autoBindRoutes(routes: RouteDef[]): Router {
    const router = Router()

    for (const route of routes) {
        const { method, path, handler } = route

        // bind dynamically
        ;(router as any)[method](path, async (req: Request, res: Response, next: NextFunction) => {
            try {
                await handler(req, res, next)
            } catch (err) {
                next(err)
            }
        })
    }

    return router
}
