import { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import type { Media } from '../types/pg'

export default function MediaPanel({
    media,
    onClose
}: {
    media: Media
    onClose: () => void
}) {

    const status = useStoreState(s => s.status.items)
    const user = useStoreState(s => s.user.current)

    const fetchStatus = useStoreActions(a => a.status.fetchByMedia)
    const returnMedia = useStoreActions(a => a.status.returnMedia)

    useEffect(() => {
        fetchStatus(media.id)
    }, [media.id])

    function getCurrentStatus(status: any[]) {
        if (!status.length) return 'ready'

            const sorted = [...status].sort(
                (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )

            return sorted[0].type
    }

    const current = getCurrentStatus(status)

    return (
        <div style={styles.panel}>

        <div style={styles.header}>
        <h3 style={styles.title}>{media.title}</h3>
        <button onClick={onClose}>X</button>
        </div>

        <div style={styles.meta}>
        <div><b>Creator:</b> {media.creator}</div>
        <div><b>Description:</b> {media.desc}</div>
        <div><b>Tags:</b> {media.tags?.join(', ')}</div>
        </div>

        {user?.type === 'admin' && (
            <button>Edit</button>
        )}

        <h4>{current}</h4>
        <table style={styles.table}>
        <tbody>
        {status.map((s: any) => (
            <tr key={s.id}>
            <td>{s.type}</td>
            <td>{s.created_at}</td>
            </tr>
        ))}
        </tbody>
        </table>

        {current !== 'loaned' ? (
            <button onClick={() => checkout(media.id)}>
            Checkout
            </button>
        ) : (
            <button onClick={() => returnMedia(media.id)}>
            Return
            </button>
        )}

        </div>
    )
}

const styles = {
    panel: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        margin: 0
    },
    meta: {
        fontSize: '13px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '4px'
    },
    table: {
        width: '100%',
        fontSize: '12px'
    }
}
