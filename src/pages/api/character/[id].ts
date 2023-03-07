import { NextApiRequest, NextApiResponse } from 'next'
import data from '../../../utils/evo-task-data.json'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  const character = data.find(c => c.id === Number(id))

  if (!character) {
    res.status(404).json({ message: 'Character not found' })
  } else {
    res.status(200).json(character)
  }
}
