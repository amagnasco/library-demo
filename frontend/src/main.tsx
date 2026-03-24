import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { StoreProvider } from 'easy-peasy'
import { store } from './store'
import './i18n'
import { OpenAPI } from './apis/generated/core/OpenAPI'

OpenAPI.TOKEN = localStorage.getItem('token') || undefined

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <StoreProvider store={store}>
                <App />
            </StoreProvider>
        </BrowserRouter>
    </React.StrictMode>
)
