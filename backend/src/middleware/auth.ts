import { Request, Response, NextFunction } from 'express'
import AuthService from '../services/AuthService.js'

const authService = new AuthService()

export interface AuthRequest extends Request {
    user?: any
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ error: 'missing authorization header' })
        }

        const [type, token] = authHeader.split(' ')

        if (type !== 'Bearer' || !token) {
            return res.status(401).json({ error: 'invalid authorization format' })
        }

        const decoded = authService.verifyToken(token)

        req.user = decoded as any
        next()

    } catch (err: any) {
        return res.status(401).json({ error: err.message || 'unauthorized' })
    }
}
