import {IBlock} from '../models'
import sha256 from 'fast-sha256'

export const myHash = (block:IBlock): string => {
  const strBlock:string = block.toString()

  const dataBuf: Uint8Array = new TextEncoder.encode(strBlock)
  sha256.hash(dataBuf)


  return ''
}
