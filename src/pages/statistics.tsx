import React from 'react'
import { useEffect, useState } from "react";
import { Character } from '@/types/Character';



export default function statistics() {
  const [characters, setCharacters] = useState<Character[]>([]);
  
  useEffect(() => {
    const fetchCharacters = async () => {
      const res = await fetch('/api/characters')
      const data = await res.json()
      setCharacters(data)
    }

    fetchCharacters()
  }, [])


  // function to get the top 3 characters that appeared in the most episodes
  const getTopCharacters = () => {
    const characterMap: { [key: string]: number } = {};
    characters.forEach(character => {
      character.episode.forEach(episode => {
        characterMap[character.id] = characterMap[character.id] ? characterMap[character.id] + 1 : 1;
      });
    });

    // sort the characters by their episode count and get the top 3
    const topCharacters = Object.keys(characterMap)
      .sort((a, b) => characterMap[b] - characterMap[a])
      .slice(0, 3)
      .map(id => characters.find(character => character.id === parseInt(id)));

    return topCharacters;
  };



  // function to get the status that is assigned to the most characters
  const getMostCommonStatus = () => {
    if (characters.length === 0) return '';
    const statusMap: { [key: string]: number } = {};

    characters.forEach(character => {
      statusMap[character.status] = statusMap[character.status] ? statusMap[character.status] + 1 : 1
    })

    const sortedStatus = Object.entries(statusMap).sort((a, b) => b[1] - a[1])

    return sortedStatus[0][0]
  }

  // function to get the location with the most characters of the species "human"
  const getMostCommonLocation = () => {
    if (characters.length === 0) return '';
    const locationMap: { [key: string]: number } = {};

    characters.forEach(character => {
      if (character.species === 'Human') {
        locationMap[character.location.name] = locationMap[character.location.name]
          ? locationMap[character.location.name] + 1
          : 1
      }
    })

    const sortedLocations = Object.entries(locationMap).sort((a, b) => b[1] - a[1])

    return sortedLocations[0][0]
  }

  // function to get the species with the most male characters
  const getMostCommonSpecies = () => {
    if (characters.length === 0) return '';
    const speciesMap: { [key: string]: number } = {};

    characters.forEach(character => {
      if (characters.length === 0) return '';
      if (character.gender === 'Male') {
        speciesMap[character.species] = speciesMap[character.species]
          ? speciesMap[character.species] + 1
          : 1
      }
    })

    const sortedSpecies = Object.entries(speciesMap).sort((a, b) => b[1] - a[1])

    return sortedSpecies[0][0]
  }


  return (
    <div className='section'>

      <ol>
        <h1>Top 3 characters</h1>
        {getTopCharacters().map(character => (
          <li key={character && character.id}>
            {character && character.name} - {character && character.episode.length} episodes
          </li>
        ))}
      </ol>
      <div> <h1>Common Status</h1> {getMostCommonStatus()}</div>
      <div>  <h1>Common Location</h1>{getMostCommonLocation()}</div>
      <div>  <h1>Common Species</h1>{getMostCommonSpecies()}</div>
    </div>
  )
}
