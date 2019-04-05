import {IBlock} from '../models'
import crypto from 'crypto'

export const myHash = (block:IBlock): string => {
  const strBlock:string = JSON.stringify(block)
  
  const sha256 = crypto.createHash('sha256')
  sha256.update(strBlock)
  const hashedData:string = sha256.digest('hex')

  return hashedData
}


export const genProof = (x: number):number => {
  let y = 0
  let hash: string
  do {
    const sha256 = crypto.createHash('sha256')
    const str = String(x * y)

    hash = sha256.update(str).digest('hex')
    y += 1
  }
  while (hash.slice(-1) !== '0')
  return y
}