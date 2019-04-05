import { IBlock } from '../models'
import crypto from 'crypto'


export const sha256 = (buf:string):string => 
  crypto.createHash('sha256').update(buf).digest('hex')

export const myHash = (block:IBlock): string => {
  const strBlock:string = JSON.stringify(block)
  const hashedData:string = sha256(strBlock)
  return hashedData
}

export const genProof = (x: number):number => {
  let y: number = 0, hash: string
  do {
    hash = sha256(String(x * y))
    y += 1
  } while (hash.slice(-1) !== '0')
  return y
}
