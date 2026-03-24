import { createStore } from 'easy-peasy'
import { mediaModel } from './media'
import { statusModel } from './status'
import { userModel } from './user'

export const store = createStore({
    media: mediaModel,
    status: statusModel,
    user: userModel
})
