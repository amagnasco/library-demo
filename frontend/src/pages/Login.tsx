import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Login() {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate()

    const { i18n, t } = useTranslation()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch('/auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: user,
                    password: pass
                })
            })

            if (!res.ok) {
                throw new Error('Invalid credentials')
            }

            const data = await res.json()

            localStorage.setItem('token', data.token)
            window.location.href = '/app'
        } catch (err) {
            console.error(err)
            alert(t('login.error'))
        }
    }

    const handleLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value)
    }

    return (
        <div style={styles.container}>
        <form onSubmit={handleLogin} style={styles.form}>
        <h2>{t('login.title')}</h2>

        <input
            placeholder={t('login.username')}
            value={user}
            onChange={e => setUser(e.target.value)}
            style={styles.input}
        />

        <input
            type="password"
            placeholder={t('login.password')}
            value={pass}
            onChange={e => setPass(e.target.value)}
            style={styles.input}
        />

        <select value={i18n.language} onChange={handleLocale} style={styles.select}>
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
        </select>

        <button type="submit" style={styles.button}>
            {t('login.button')}
        </button>

        </form>

        <div style={styles.footer}>
            <p>Alessandro G. Magnasco 2026</p>
        </div>

        </div>
    )
}

const styles = {
    container: {
        height: '98vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'black',
        color: 'white'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '250px'
    },
    input: {
        padding: '8px'
    },
    button: {
        padding: '10px',
        cursor: 'pointer'
    },
    select: {
        padding: '6px',
        cursor: 'pointer'
    },
    footer: {
        padding: '10px',
        position: 'absolute',
        bottom: '0px',
        right: '50px'
    }
}
