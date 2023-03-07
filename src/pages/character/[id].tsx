import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Character } from '../../types/Character'

type Props = {}

const CharacterPage: FC<Props> = () => {
    const router = useRouter()
    const { id } = router.query

    const [character, setCharacter] = useState<Character>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/character/${id}`)
            const data = await response.json()
            setCharacter(data)
        }

        fetchData()
    }, [id])

    if (!character) {
        return <div>Loading...</div>
    }

    const {
        image,
        species,
        created,
        status,
        gender,
        location: { name: locationName },
        episode,
    } = character

    return (
        <div className='center'>
            <img src={image} alt={species} />
            <p>Species: {species}</p>
            <p>Created At: {created}</p>
            <p>Status: {status}</p>
            <p>Gender: {gender}</p>
            <p>Location Name: {locationName}</p>
            <p>Episodes: {episode.length}</p>
        </div>
    )
}

export default CharacterPage
