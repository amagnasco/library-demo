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
            `INSERT INTO status ("mediaId", type, "user", date)
            VALUES ($1,$2,$3, NOW())
            RETURNING *`,
            [
                data.mediaId,
                data.type,
                data.user,
            ]
        )
        return this.map(res.rows[0])
    }

    async update(id: number, data: Partial<pg.Status>): Promise<pg.Status | null> {
        const res = await pool.query(
            `UPDATE status SET
            "mediaId" = COALESCE($1, "mediaId"),
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

    async readAll(filters: {
        mediaIds?: number[],
        userIds?: number[],
        type?: 'ready' | 'loaned' | 'returned',
        fromDate?: string,
        toDate?: string
    }): Promise<pg.Status[]> {
        const conditions: string[] = []
        const values: any[] = []

        if (filters.mediaIds?.length) {
            values.push(filters.mediaIds)
            conditions.push(`"mediaId" = ANY($${values.length})`)
        }

        if (filters.userIds?.length) {
            values.push(filters.userIds)
            conditions.push(`"user" = ANY($${values.length})`)
        }

        if (filters.type) {
            values.push(filters.type)
            conditions.push(`type = $${values.length}`)
        }

        if (filters.fromDate) {
            values.push(filters.fromDate)
            conditions.push(`date >= $${values.length}`)
        }

        if (filters.toDate) {
            values.push(filters.toDate)
            conditions.push(`date <= $${values.length}`)
        }

        const query = `
        SELECT * FROM status
        ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
        `

        const res = await pool.query(query, values)
        return res.rows.map(this.map)
    }
}
