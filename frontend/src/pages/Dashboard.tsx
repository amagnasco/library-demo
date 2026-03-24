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
    const allStatus = useStoreState(s => s.status.items)

    const fetchMedia = useStoreActions(a => a.media.fetch)
    const selectMedia = useStoreActions(a => a.media.select)
    const fetchUser = useStoreActions(a => a.user.fetch)
    const fetchAllStatus = useStoreActions(a => a.status.fetchAll)

    const [filtered, setFiltered] = useState<any[]>([])

    useEffect(() => {
        fetchMedia()
        fetchUser()
        fetchAllStatus()
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

    function getMediaStatusMap(status: any[]) {
        const map: Record<number, string> = {}

        const sorted = [...status].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        for (const s of sorted) {
            if (!map[s.media_id]) {
                map[s.media_id] = s.type
            }
        }

        return map
    }

    const statusMap = getMediaStatusMap(allStatus)

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

            <div style={styles.content}>
                {filtered.length === 0 ? (
                    <div style={styles.empty}>No media found</div>
                ) : (
                    <div style={styles.grid}>
                    {filtered.map((m: any) => (
                        <MediaCard
                        key={m.id}
                        media={m}
                        status={statusMap[m.id]}
                        onClick={() => selectMedia(m)}
                        />
                    ))}
                    </div>
                )}
            </div>

        </Layout>
    )
}

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '10px',
        //background: 'black',
        color: 'white',
        marginLeft: '10px'
    },
    empty: {
        padding: '20px',
        textAlign: 'center'
    },
    content: {
        padding: '10px',
        boxSizing: 'border-box'
    }
}
