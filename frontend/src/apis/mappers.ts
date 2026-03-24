import type { Media, Status, User } from '../types/pg'

export const mapMedia = (m: any): Media => ({
    id: m.id,
    type: m.type ?? 'book',          // default to 'book' if missing
    title: m.title,
    creator: m.creator ?? '',
    desc: m.desc ?? '',
    tags: Array.isArray(m.tags) ? m.tags : [],
    added: new Date(m.added || m.created_at || Date.now()),
    active: m.active ?? true,
    cost: m.cost
})

export const mapStatus = (s: any): Status => ({
    id: s.id,
    mediaId: s.media_id ?? s.mediaId,
    type: s.type,
    user: s.user ?? 0,
    date: new Date(s.date || s.created_at)
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
