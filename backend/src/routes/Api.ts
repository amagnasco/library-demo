import { Request, Response } from 'express'
import { autoBindRoutes, RouteDef } from './autoBind.js'

import UserService from '../services/UserService.js'
import MediaService from '../services/MediaService.js'
import StatusService from '../services/StatusService.js'

const userService = new UserService()
const mediaService = new MediaService()
const statusService = new StatusService()

export default class ApiCTR {

    private routes(): RouteDef[] {
        return [

            /* USERS */

            {
                method: 'get',
                path: '/users',
                handler: async (_req, res) => {
                    res.json(await userService.getAll())
                }
            },

            {
                method: 'get',
                path: '/users/:id',
                handler: async (req, res) => {
                    const user = await userService.getById(Number(req.params.id))
                    if (!user) return res.sendStatus(404)
                        res.json(user)
                }
            },

            /* MEDIA */

            {
                method: 'get',
                path: '/media',
                handler: async (_req, res) => {
                    res.json(await mediaService.getAll())
                }
            },

            {
                method: 'post',
                path: '/media',
                handler: async (req, res) => {
                    const item = await mediaService.create(req.body)
                    res.status(201).json(item)
                }
            },

            {
                method: 'patch',
                path: '/media/:id',
                handler: async (req, res) => {
                    const item = await mediaService.update(Number(req.params.id), req.body)
                    if (!item) return res.sendStatus(404)
                        res.json(item)
                }
            },

            {
                method: 'delete',
                path: '/media/:id',
                handler: async (req, res) => {
                    const ok = await mediaService.delete(Number(req.params.id))
                    if (!ok) return res.sendStatus(404)
                        res.sendStatus(204)
                }
            },

            /* STATUS */

            {
                method: 'get',
                path: '/status',
                handler: async (_req, res) => {
                    res.json(await statusService.getAll())
                }
            },

            {
                method: 'post',
                path: '/status',
                handler: async (req, res) => {
                    const item = await statusService.create(req.body)
                    res.status(201).json(item)
                }
            },

            {
                method: 'patch',
                path: '/status/:id',
                handler: async (req, res) => {
                    const item = await statusService.update(Number(req.params.id), req.body)
                    if (!item) return res.sendStatus(404)
                        res.json(item)
                }
            },

            {
                method: 'post',
                path: '/status/read-all',
                handler: async (req, res) => {
                    const { mediaIds, userIds, type, fromDate, toDate } = req.body

                    const items = await statusService.readAll({
                        mediaIds,
                        userIds,
                        type,
                        fromDate,
                        toDate
                    })

                    res.json(items)
                }
            }

        ]
    }

    public getRouter() {
        return autoBindRoutes(this.routes())
    }
}
