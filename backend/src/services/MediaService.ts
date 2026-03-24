import pool from './DbService.js'

export default class MediaService {

    private map(row: any): pg.Media {
        return {
            ...row,
            tags: row.tags ? row.tags.split(',') : [],
            added: row.added ? new Date(row.added) : undefined
        }
    }

    async getAll(): Promise<pg.Media[]> {
        const res = await pool.query(`SELECT * FROM media`)
        return res.rows.map(this.map)
    }

    async create(data: Partial<pg.Media>): Promise<pg.Media> {
        const res = await pool.query(
            `INSERT INTO media (type, title, creator, "desc", tags, added, active, cost)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *`,
            [
                data.type,
                data.title,
                data.creator,
                data.desc,
                data.tags?.join(','),
                data.added,
                data.active,
                data.cost
            ]
        )
        return this.map(res.rows[0])
    }

    async update(id: number, data: Partial<pg.Media>): Promise<pg.Media | null> {
        const res = await pool.query(
            `UPDATE media SET
            type = COALESCE($1, type),
            title = COALESCE($2, title),
            creator = COALESCE($3, creator),
            desc = COALESCE($4, "desc"),
            tags = COALESCE($5, tags),
            added = COALESCE($6, added),
            active = COALESCE($7, active),
            cost = COALESCE($8, cost)
            WHERE id = $9
            RETURNING *`,
            [
            data.type,
            data.title,
            data.creator,
            data.desc,
            data.tags?.join(','),
            data.added,
            data.active,
            data.cost,
            id
            ]
        )

        if (!res.rows[0]) return null
            return this.map(res.rows[0])
    }

    async delete(id: number): Promise<boolean> {
        const res = await pool.query(`DELETE FROM media WHERE id = $1`, [id])
        return (res.rowCount ?? 0) > 0
    }
}
