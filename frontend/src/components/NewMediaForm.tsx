import { useState } from 'react'
import { useStoreActions } from 'easy-peasy'
import { useTranslation } from 'react-i18next'

export default function NewMediaForm() {

    const { t } = useTranslation()

    const create = useStoreActions((a: any) => a.media.create)

    const [form, setForm] = useState({
        title: '',
        creator: '',
        desc: '',
        tags: ''
    })

    const handleChange = (k: string, v: string) => {
        setForm({ ...form, [k]: v })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await create({
            type: 'book',
            title: form.title,
            creator: form.creator,
            desc: form.desc,
            tags: form.tags
            .split(',')
            .map(t => t.trim())
            .filter(Boolean),
                     added: new Date(),
                     active: true
        })

        setForm({ title: '', creator: '', desc: '', tags: '' })
    }

    return (
        <div style={{ width: '100%', maxWidth: '300px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <input placeholder={t('media.title')} value={form.title} onChange={e => handleChange('title', e.target.value)} />
            <input placeholder={t('media.creator')} value={form.creator} onChange={e => handleChange('creator', e.target.value)} />
            <textarea placeholder={t('media.desc')} value={form.desc} onChange={e => handleChange('desc', e.target.value)} />
            <input placeholder={t('media.tags')} value={form.tags} onChange={e => handleChange('tags', e.target.value)} />
            <button type="submit">{t('main.submit')}</button>
            </form>
        </div>
    )
}
