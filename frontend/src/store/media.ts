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

    addOne: action((state, media: Media) => {
        state.items.unshift(media) // add to top
    }),

    updateOne: action((state, media: Media) => {
        const idx = state.items.findIndex(m => m.id === media.id)
        if (idx !== -1) state.items[idx] = media

            if (state.selected?.id === media.id) {
                state.selected = media
            }
    }),

    removeOne: action((state, id: number) => {
        state.items = state.items.filter(m => m.id !== id)

        if (state.selected?.id === id) {
            state.selected = null
        }
    }),

    select: action((state, media: Media | null) => {
        state.selected = media
    }),

    fetch: thunk(async (actions) => {
        const data = await DefaultService.getMedia()
        actions.set(data.map(mapMedia))
    }),

    create: thunk(async (actions, payload) => {
        const created = await DefaultService.postMedia(payload)
        actions.addOne(mapMedia(created))
    }),

    update: thunk(async (actions, { id, data }) => {
        const updated = await DefaultService.patchMedia(id, data)
        actions.updateOne(mapMedia(updated))
    }),

    remove: thunk(async (actions, id: number) => {
        await DefaultService.deleteMedia(id)
        actions.removeOne(id)
    })
}
