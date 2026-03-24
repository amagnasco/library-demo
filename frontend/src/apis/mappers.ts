import type { Media, Status, User } from '../types/pg'

export const mapMedia = (m: any): Media => ({
    id: m.id,
    title: m.title,
    active: m.active
})

export const mapStatus = (s: any): Status => ({
    id: s.id,
    media_id: s.media_id,
    type: s.type,
    created_at: s.created_at
})

export function mapUser(u: any): User {
    const user = u?.user ?? u?.data ?? u

    return {
        id: user.id,
        login: user.login,
        type: user.type,
        active: user.active ?? true,
        password: '',
        locale: user.locale,
        phone: user.phone
    }
}
