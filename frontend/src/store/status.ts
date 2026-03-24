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

    checkout: thunk(async (actions, { mediaId, userId }) => {
        if (!userId) throw new Error('No user ID provided for checkout')

            await DefaultService.postStatus({
                mediaId,
                type: 'loaned',
                date: new Date(),
                user: userId
            })
            actions.fetchByMedia(mediaId)
    }),

    returnMedia: thunk(async (actions, { mediaId, userId }) => {
        if (!userId) throw new Error('No user ID provided for return')

            await DefaultService.postStatus({
                mediaId,
                type: 'returned',
                date: new Date(),
                user: userId
            })
            actions.fetchByMedia(mediaId)
    }),

    fetchAll: thunk(async (actions) => {
        const data = await DefaultService.postStatusReadAll({})
        actions.set(data.map(mapStatus))
    }),
}
