import {IBlock} from '../models'
import * as sha256 from 'fast-sha256'

export const myHash = (block:IBlock): string => {
  const strBlock:string = block.toString()
  const enc = new TextEncoder()

  const dataBuf: Uint8Array = enc.encode(strBlock)
  const hashedData: Uint8Array = sha256.hash(dataBuf)

  return String(hashedData)
}

