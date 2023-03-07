import { NextApiRequest, NextApiResponse } from 'next'
import charactersData from '../../utils/evo-task-data.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(charactersData)
}
