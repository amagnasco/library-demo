import { OpenAPI } from './generated/core/OpenAPI'

OpenAPI.BASE = '/api'
OpenAPI.TOKEN = async () => {
    return localStorage.getItem('token') || ''
}
