import { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useTranslation } from 'react-i18next'
import type { Media } from '../types/pg'

export default function MediaPanel({
    media,
    onClose
}: {
    media: Media
    onClose: () => void
}) {
    const { t } = useTranslation()

    const status = useStoreState(s => s.status.items)
    const user = useStoreState(s => s.user.current)

    const fetchStatus = useStoreActions(a => a.status.fetchByMedia)
    const checkoutMedia = useStoreActions(a => a.status.checkout)
    const returnMedia = useStoreActions(a => a.status.returnMedia)

    const updateMedia = useStoreActions(a => a.media.update)
    const removeMedia = useStoreActions(a => a.media.remove)

    const mediaStatus = status.filter(s => s.mediaId === media.id)

    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({
        title: media.title,
        creator: media.creator,
        desc: media.desc,
        tags: media.tags?.join(', ') || ''
    })

    useEffect(() => {
        fetchStatus(media.id)
        setForm({
            title: media.title,
            creator: media.creator,
            desc: media.desc,
            tags: media.tags?.join(', ') || ''
        })
    }, [media.id])

    const current = (() => {
        if (!mediaStatus.length) return 'ready'
            const sorted = [...mediaStatus].sort(
                (a, b) => b.date.getTime() - a.date.getTime()
            )
            return sorted[0].type
    })()

    const handleChange = (k: string, v: string) => {
        setForm(prev => ({ ...prev, [k]: v }))
    }

    const handleUpdate = async () => {
        await updateMedia({ id: media.id, data: {
            title: form.title,
            creator: form.creator,
            desc: form.desc,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
        }})
        setEditing(false)
    }

    const handleDelete = async () => {
        if (confirm(t('media.erase'))) {
            await removeMedia(media.id)
            onClose()
        }
    }

    const handleCheckout = () => {
        if (!user?.id) return alert(t('login.error'))
            checkoutMedia({ mediaId: media.id, userId: user.id })
    }

    const handleReturn = () => {
        if (!user?.id) return alert(t('login.error'))
            returnMedia({ mediaId: media.id, userId: user.id })
    }

    return (
        <div style={styles.panel}>

        <div style={styles.header}>
        <h3 style={styles.title}>{media.title}</h3>
        <button style={styles.closeBtn} onClick={onClose}>X</button>
        </div>

        {editing && user?.type === 'admin' ? (
            <div style={styles.editForm}>
            <input value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder={t('media.title')} />
            <input value={form.creator} onChange={e => handleChange('creator', e.target.value)} placeholder={t('media.creator')} />
            <textarea value={form.desc} onChange={e => handleChange('desc', e.target.value)} placeholder={t('media.desc')} />
            <input value={form.tags} onChange={e => handleChange('tags', e.target.value)} placeholder={t('media.tags')} />
            <div style={styles.btnRow}>
            <button style={styles.smallBtn} onClick={handleUpdate}>{t('main.save')}</button>
            <button style={styles.smallBtn} onClick={() => setEditing(false)}>{t('main.cancel')}</button>
            </div>
            </div>
        ) : (
            <div style={styles.meta}>
            <div><b>{t('media.creator')}:</b> {media.creator}</div>
            <div><b>{t('media.desc')}:</b> {media.desc}</div>
            <div><b>{t('media.tags')}:</b> {media.tags?.join(', ')}</div>
            {user?.type === 'admin' && (
                <div style={styles.btnRow}>
                <button style={styles.smallBtn} onClick={() => setEditing(true)}>{t('main.edit')}</button>
                <button style={styles.smallBtn} onClick={handleDelete}>{t('main.erase')}</button>
                </div>
            )}
            </div>
        )}

        <h4>Status: {t('status.' + current)}</h4>
        <table style={styles.table}>
        <tbody>
        {mediaStatus.map(s => (
            <tr key={s.id}>
            <td>{t('status.' + s.type)}</td>
            <td>{new Date(s.date).toLocaleString()}</td>
            </tr>
        ))}
        </tbody>
        </table>

        <div style={styles.btnRow}>
        {current !== 'loaned' ? (
            <button style={styles.smallBtn} onClick={handleCheckout}>{t('status.checkout')}</button>
        ) : (
            <button style={styles.smallBtn} onClick={handleReturn}>{t('status.checkin')}</button>
        )}
        </div>
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
    title: { margin: 0 },
    closeBtn: { fontSize: '12px', padding: '2px 5px' },
    meta: {
        fontSize: '13px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '4px'
    },
    table: { width: '100%', fontSize: '12px' },
    btnRow: { display: 'flex', gap: '5px', marginTop: '5px' },
    smallBtn: { fontSize: '11px', padding: '2px 6px' },
    editForm: { display: 'flex', flexDirection: 'column', gap: '5px' }
}
