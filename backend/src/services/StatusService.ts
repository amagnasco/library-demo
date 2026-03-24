import pool from './DbService.js'

export default class StatusService {

    private map(row: any): pg.Status {
        return {
            ...row,
            date: row.date ? new Date(row.date) : undefined
        }
    }

    async getAll(): Promise<pg.Status[]> {
        const res = await pool.query(`SELECT * FROM status`)
        return res.rows.map(this.map)
    }

    async create(data: Partial<pg.Status>): Promise<pg.Status> {
        const res = await pool.query(
            `INSERT INTO status (mediaId, type, "user", date)
            VALUES ($1,$2,$3,$4)
            RETURNING *`,
            [
                data.mediaId,
                data.type,
                data.user,
                data.date
            ]
        )
        return this.map(res.rows[0])
    }

    async update(id: number, data: Partial<pg.Status>): Promise<pg.Status | null> {
        const res = await pool.query(
            `UPDATE status SET
            mediaId = COALESCE($1, mediaId),
                                     type = COALESCE($2, type),
                                     "user" = COALESCE($3, "user"),
                                     date = COALESCE($4, date)
                                     WHERE id = $5
                                     RETURNING *`,
                                     [
                                         data.mediaId,
                                     data.type,
                                     data.user,
                                     data.date,
                                     id
                                     ]
        )

        if (!res.rows[0]) return null
            return this.map(res.rows[0])
    }
}
