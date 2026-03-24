import { action, thunk } from 'easy-peasy'
import {jwtDecode} from 'jwt-decode'
import type { User } from '../types/pg'

export const userModel = {
    current: null as User | null,

    set: action((state, payload: User) => {
        state.current = payload
    }),

    fetch: thunk(async (actions) => {
        const token = localStorage.getItem('token')

        if (!token) return

            const decoded: any = jwtDecode(token)

            actions.set({
                id: decoded.id,
                login: decoded.login,
                type: decoded.type,
                active: true,
                password: '',
                locale: decoded.locale
            })
    })
}
