import { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

import Layout from '../components/Layout'
import MediaCard from '../components/MediaCard'
import MediaPanel from '../components/MediaPanel'
import NewMediaForm from '../components/NewMediaForm'

export default function Dashboard() {

    const media = useStoreState(s => s.media.items)
    const selected = useStoreState(s => s.media.selected)
    const user = useStoreState(s => s.user.current)

    const fetchMedia = useStoreActions(a => a.media.fetch)
    const fetchUser = useStoreActions(a => a.user.fetch)
    const selectMedia = useStoreActions(a => a.media.select)

    const [filtered, setFiltered] = useState<any[]>([])

    useEffect(() => {
        fetchMedia()
        fetchUser()
    }, [])

    useEffect(() => {
        setFiltered(media)
    }, [media])

    const handleSearch = (q: string) => {
        const s = q.toLowerCase()

        setFiltered(
            media.filter((m: any) =>
            m.title.toLowerCase().includes(s) ||
            m.creator.toLowerCase().includes(s) ||
            m.tags?.some((t: string) => t.toLowerCase().includes(s))
            )
        )
    }

    return (
        <Layout
        user={user}
        onSearch={handleSearch}
        leftPanel={user?.type === 'admin' && <NewMediaForm />}
        rightPanel={
            selected && (
                <MediaPanel
                media={selected}
                onClose={() => selectMedia(null)}
                />
            )
        }
        >

        {filtered.length === 0 ? (
            <div style={styles.empty}>
            No media found
            </div>
        ) : (
            <div style={styles.grid}>
            {filtered.map((m: any) => (
                <MediaCard
                key={m.id}
                media={m}
                onClick={() => selectMedia(m)}
                />
            ))}
            </div>
        )}
        </Layout>
    )
}

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '10px',
        background: 'black',
        color: 'white'
    },
    empty: {
        padding: '20px',
        textAlign: 'center'
    }
}
