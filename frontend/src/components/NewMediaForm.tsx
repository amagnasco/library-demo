import { useState } from 'react'
import { useStoreActions } from 'easy-peasy'

export default function NewMediaForm() {

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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <input placeholder="Title" value={form.title} onChange={e => handleChange('title', e.target.value)} />
        <input placeholder="Author" value={form.creator} onChange={e => handleChange('creator', e.target.value)} />
        <textarea placeholder="Description" value={form.desc} onChange={e => handleChange('desc', e.target.value)} />
        <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => handleChange('tags', e.target.value)} />
        <button type="submit">Create</button>
        </form>
    )
}
