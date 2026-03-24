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
    const checkout = useStoreActions(a => a.status.checkout)

    useEffect(() => {
        fetchStatus(media.id)
    }, [media.id])

    return (
        <div>
        <button onClick={onClose}>X</button>

        <h3>{media.title}</h3>

        {user?.type === 'admin' && (
            <button>Edit</button>
        )}

        <table>
        <tbody>
        {status.map((s: any) => (
            <tr key={s.id}>
            <td>{s.type}</td>
            <td>{s.created_at}</td>
            </tr>
        ))}
        </tbody>
        </table>

        {user?.type === 'patron' && (
            <button onClick={() => checkout(media.id)}>
            Checkout
            </button>
        )}
        </div>
    )
}
