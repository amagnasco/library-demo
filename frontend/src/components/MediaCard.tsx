import type { Media } from '../types/pg'

export default function MediaCard({
    media,
    status,
    onClick
}: {
    media: Media
    status?: string
    onClick: () => void
}) {

    const isLoaned = status === 'loaned'

    return (
        <div
            style={{
                ...styles.card,
                opacity: isLoaned ? 0.5 : 1,
                border: isLoaned ? '1px solid #aa4444' : '1px solid #444'
            }}
            onClick={onClick}
        >
        <div style={styles.title}>{media.title}</div>
        <div style={styles.badge}>{isLoaned?'📤':'✅'}</div>

        </div>
    )
}

const styles = {
    card: {
        position: 'relative',
        height: '90px',
        padding: '8px',
        borderRadius: '4px',
        background: '#111',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden'
    },
    title: {
        fontSize: '12px',
        lineHeight: '1.2',
        color: '#ddd',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden'
    },
    badge: {
        position: 'absolute',
        top: '4px',
        right: '4px',
        fontSize: '10px',
        //background: '#aa4444',
        padding: '2px 4px',
        borderRadius: '2px'
    }
}
