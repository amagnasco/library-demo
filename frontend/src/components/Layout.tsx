import { useState } from 'react'

type LayoutProps = {
    children: React.ReactNode
    leftPanel?: React.ReactNode
    rightPanel?: React.ReactNode
    user?: any
    onSearch?: (q: string) => void
}

export default function Layout({
    user,
    children,
    leftPanel,
    rightPanel,
    onSearch
}: LayoutProps) {

    const [query, setQuery] = useState('')

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch?.(query)
    }

    return (
        <div style={styles.wrapper}>

        <div style={styles.topbar}>
            <div style={styles.logo}>
            Library Demo
            </div>

            <form onSubmit={handleSearch} style={styles.search}>
            <input
            placeholder="Search title, author, tags..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={styles.searchInput}
            />
            </form>

            <div style={styles.userArea}>
            <span>{user?.login}</span>
            <button onClick={handleLogout}>Logout</button>
            </div>
        </div>

        <div style={styles.container}>
            {user?.type === 'admin' && (
                <aside style={styles.sidebar}>
                <h3>New Media</h3>
                {leftPanel}
                </aside>
            )}

            <main style={styles.main}>
            {children}
            </main>

            {rightPanel && (
                <aside style={styles.sidebar}>
                {rightPanel}
                </aside>
            )}
            </div>
        </div>
    )
}

const styles = {
    wrapper: {
        height: '98vh',
        display: 'flex',
        flexDirection: 'column'
    },
    topbar: {
        height: '50px',
        background: '#222',
        color: 'white',
        display: 'grid',
        gridTemplateColumns: '200px 1fr 200px',
        alignItems: 'center',
        padding: '0 10px',
        gap: '10px'
    },
    logo: {
        fontWeight: 'bold'
    },
    search: {
        display: 'flex'
    },
    searchInput: {
        width: '100%',
        padding: '5px'
    },
    userArea: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    container: {
        display: 'grid',
        gridTemplateColumns: '200px 1fr auto',
        flex: 1
    },
    sidebar: {
        width: '200px',
        background: '#eee',
        padding: '10px'
    },
    main: {
        padding: '10px',
        overflow: 'auto'
    }
}
