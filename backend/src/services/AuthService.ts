import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

// authentication manager
export default class AuthService {

    constructor(
        private users: pg.User[],
        private jwtSecret: string = 'demo'
    ) {}

    async login(login: string, password: string): Promise<string> {
        const user = await this.authenticate(login, password)
        return this.signToken(user)
    }

    private async authenticate(login: string, password: string): Promise<Omit<pg.User, 'password'>> {
        if (!login || !password) {
            throw new Error('missing credentials')
        }

        const user = this.users.find(u => u.login === login)

        if (!user) throw new Error('user not found')
        if (!user.active) throw new Error('user inactive')

        const match = await argon2.verify(user.password, password)
        if (!match) throw new Error('invalid password')

        const { password: _, ...clean } = user
        return clean
    }

    private signToken(user: Omit<pg.User, 'password'>): string {
        return jwt.sign(
            {
                id: user.id,
                login: user.login,
                type: user.type,
                locale: user.locale
            },
            this.jwtSecret,
            { expiresIn: '24h' }
        )
    }

    verifyToken(token: string) {
        try {
            return jwt.verify(token, this.jwtSecret)
        } catch {
            throw new Error('invalid token')
        }
    }

    async hashPassword(password: string) {
        return argon2.hash(password)
    }
}
