

import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { Character } from '../types/Character'
import { List, } from 'antd';
import Pagination from './Pagination';



type Props = {}

const CharacterList: FC<Props> = () => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)

    // The number of characters that should be displayed on each page
    const charactersPerPage = 25

    // The index of the last character that should be displayed on the current page
    const indexOfLastCharacter = currentPage * charactersPerPage

    // The index of the first character that should be displayed on the current page
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage

    // The characters that should be displayed on the current page
    const currentCharacters = characters.slice(
        indexOfFirstCharacter,
        indexOfLastCharacter
    )

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/characters')
            const data = await response.json()
            setCharacters(data)
        }

        fetchData()
    }, [])

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className='' >
            <List
                grid={{ gutter: 16, column: 4 }}
                itemLayout="horizontal"
                dataSource={currentCharacters}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta

                            title={<Link href={`/character/${item.id}`}>{item.name}</Link>}
                            description={item.status}
                        />
                    </List.Item>
                )}
            />
            <Pagination
                totalCharacters={characters.length}
                currentPage={currentPage}
                charactersPerPage={charactersPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default CharacterList
