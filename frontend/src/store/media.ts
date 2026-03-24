import { action, thunk } from 'easy-peasy'
import { DefaultService } from '../apis/generated/services/DefaultService'
import { mapMedia } from '../apis/mappers'
import type { Media } from '../types/pg'

export const mediaModel = {
    items: [] as Media[],
    selected: null as Media | null,

    set: action((state, payload: Media[]) => {
        state.items = payload
    }),

    select: action((state, media: Media | null) => {
        state.selected = media
    }),

    fetch: thunk(async (actions) => {
        const data = await DefaultService.getMedia({ active: true })
        actions.set(data.map(mapMedia))
    })
}
