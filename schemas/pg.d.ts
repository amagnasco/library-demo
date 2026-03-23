declare global {
    namespace pg {

        type locales = 'en' | 'es' | 'fr'

        interface user {
            id: number
            active: boolean
            login: string
            password: string
            type: 'admin' | 'patron'
            locale?: locales
            phone?: string
        }

        interface media {
            id: number
            type: 'book'
            title: string
            creator: string
            desc?: string
            tags?: string[]
            added: Date
            active: boolean
            cost?: number
        }

        interface mediaStatus {
            id: number
            mediaId: number
            type: 'ready' | 'loaned' | 'returned'
            user: number
            date: Date
        }

    }
}
