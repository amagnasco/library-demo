import { action, thunk } from 'easy-peasy'
import { DefaultService } from '../apis/generated/services/DefaultService'
import { mapStatus } from '../apis/mappers'
import type { Status } from '../types/pg'

export const statusModel = {
    items: [] as Status[],

    set: action((state, payload: Status[]) => {
        state.items = payload
    }),

    fetchByMedia: thunk(async (actions, mediaId: number) => {
        const data = await DefaultService.getStatus({
            media_id: mediaId
        })
        actions.set(data.map(mapStatus))
    }),

    checkout: thunk(async (actions, mediaId: number) => {
        await DefaultService.createStatus({
            requestBody: {
                media_id: mediaId,
                type: 'checkout'
            }
        })
        actions.fetchByMedia(mediaId)
    })
}
