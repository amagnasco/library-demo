import { Request, Response } from 'express'
import { autoBindRoutes, RouteDef } from './autoBind.js'

const users:pg.User[] = [
    {
        id: 1,
        active: true,
        login: 'admin',
        password: '$argon2id$...', // hashed
        type: 'admin'
    }
]

let media: pg.Media[] = []
let mediaStatus: pg.MediaStatus[] = []

let mediaId = 1
let mediaStatusId = 1

// for authenticated routes
export default class ApiCTR {

    private routes(): RouteDef[] {
        return [

            /*      USERS        */

            {
                method: 'get',
                path: '/users',
                handler: async (_req: Request, res: Response) => {
                    res.json(users)
                }
            },

            {
                method: 'get',
                path: '/users/:id',
                handler: async (req: Request, res: Response) => {
                    const user = users.find(u => u.id === Number(req.params.id))
                    if (!user) return res.sendStatus(404)
                        res.json(user)
                }
            },

            /*      MEDIA        */

            {
                method: 'get',
                path: '/media',
                handler: async (_req: Request, res: Response) => {
                    res.json(media)
                }
            },

            {
                method: 'post',
                path: '/media',
                handler: async (req: Request, res: Response) => {
                    const item = {
                        ...req.body,
                        id: mediaId++,
                        added: new Date(req.body.added)
                    }

                    media.push(item)
                    res.status(201).json(item)
                }
            },

            {
                method: 'patch',
                path: '/media/:id',
                handler: async (req: Request, res: Response) => {
                    const item = media.find(m => m.id === Number(req.params.id))
                    if (!item) return res.sendStatus(404)

                        Object.assign(item, req.body)

                        if (req.body.added) {
                            item.added = new Date(req.body.added)
                        }

                        res.json(item)
                }
            },

            {
                method: 'delete',
                path: '/media/:id',
                handler: async (req: Request, res: Response) => {
                    const idx = media.findIndex(m => m.id === Number(req.params.id))
                    if (idx === -1) return res.sendStatus(404)

                        media.splice(idx, 1)
                        res.sendStatus(204)
                }
            },

            {
                method: 'post',
                path: '/media/read-all',
                handler: async (req: Request, res: Response) => {
                    const { ids, active, tags } = req.body || {}

                    let result = [...media]

                    if (ids) result = result.filter(m => ids.includes(m.id))
                        if (typeof active === 'boolean') result = result.filter(m => m.active === active)
                            if (tags) result = result.filter(m => m.tags?.some((t: string) => tags.includes(t)))

                                res.json(result)
                }
            },

            /*      MEDIA STATUS        */

            {
                method: 'get',
                path: '/media-status',
                handler: async (_req: Request, res: Response) => {
                    res.json(mediaStatus)
                }
            },

            {
                method: 'post',
                path: '/media-status',
                handler: async (req: Request, res: Response) => {
                    const item = {
                        ...req.body,
                        id: mediaStatusId++,
                        date: new Date(req.body.date)
                    }

                    mediaStatus.push(item)
                    res.status(201).json(item)
                }
            },

            {
                method: 'patch',
                path: '/media-status/:id',
                handler: async (req: Request, res: Response) => {
                    const item = mediaStatus.find(ms => ms.id === Number(req.params.id))
                    if (!item) return res.sendStatus(404)

                        Object.assign(item, req.body)

                        if (req.body.date) {
                            item.date = new Date(req.body.date)
                        }

                        res.json(item)
                }
            },

            {
                method: 'post',
                path: '/media-status/read-all',
                handler: async (req: Request, res: Response) => {
                    const { mediaIds, userIds, type, fromDate, toDate } = req.body || {}

                    let result = [...mediaStatus]

                    if (mediaIds) result = result.filter(ms => mediaIds.includes(ms.mediaId))
                        if (userIds) result = result.filter(ms => userIds.includes(ms.user))
                            if (type) result = result.filter(ms => ms.type === type)

                                if (fromDate) {
                                    const from = new Date(fromDate)
                                    result = result.filter(ms => ms.date >= from)
                                }

                                if (toDate) {
                                    const to = new Date(toDate)
                                    result = result.filter(ms => ms.date <= to)
                                }

                                res.json(result)
                }
            }

        ]
    }

    public getRouter() {
        return autoBindRoutes(this.routes())
    }
}
