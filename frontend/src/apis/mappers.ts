import type { Media, Status, User } from '../types/pg'

export const mapMedia = (m: any): Media => ({
    id: m.id,
    type: m.type ?? 'book',
    title: m.title,
    creator: m.creator ?? '',
    desc: m.desc ?? '',
    tags: Array.isArray(m.tags) ? m.tags : [],
    added: new Date(m.added || m.created_at || Date.now()),
    active: m.active ?? true,
    cost: m.cost
})

export const mapStatus = (s: any): Status => ({
    id: Number(s.id),
    mediaId: Number(s.mediaId ?? s.media_id),
    type: s.type as 'ready' | 'loaned' | 'returned',
    user: Number(s.user),
    date: s.date ? new Date(s.date) : new Date()
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
