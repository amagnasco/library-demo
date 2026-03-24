import { Request, Response } from 'express'
import AuthService from '../services/AuthService.js'

const authService = new AuthService()

// for unauthenticated routes
export default class AuthCTR {

    async login(req: Request, res: Response) {
        try {
            const { login, password } = req.body

            const token = await authService.login(login, password)

            res.json({ token })
        } catch (err: any) {
            res.status(401).json({ error: err.message })
        }
    }
}
