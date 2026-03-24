import type { Media } from '../types/pg'

export default function MediaCard({
    media,
    onClick
}: {
    media: Media
    onClick: () => void
}) {
    return (
        <div onClick={onClick}>
        <h4>{media.title}</h4>
        </div>
    )
}
