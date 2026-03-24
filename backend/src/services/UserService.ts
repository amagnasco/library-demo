import pool from './DbService.js'

export default class UserService {

    async getAll(): Promise<Omit<pg.User, 'password'>[]> {
        const res = await pool.query(`SELECT * FROM users`)
        return res.rows.map(this.stripPassword)
    }

    async getById(id: number): Promise<Omit<pg.User, 'password'> | null> {
        const res = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
        if (!res.rows[0]) return null
            return this.stripPassword(res.rows[0])
    }

    private stripPassword(user: pg.User): Omit<pg.User, 'password'> {
        const { password, ...rest } = user
        return rest
    }
}
