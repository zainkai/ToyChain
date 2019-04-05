import {IBlock} from '../models'
import * as sha256 from 'fast-sha256'

export const myHash = (block:IBlock): string => {
  const strBlock:string = JSON.stringify(block)
  const enc = new TextEncoder('hex')
  const dataBuf: Uint8Array = enc.encode(strBlock)

  const hasher = new sha256.Hash();
  hasher.update(dataBuf)
  hasher.digest()


  // TODO: ensure keys are ordered
  
  
  const hashedData: Uint8Array = sha256.hash(dataBuf)

  return hashedData.join('')
}


export const genProof = (x: number) =>  {
  const enc = new TextEncoder('hex')


  let y = 0
  let str = String(x * y)
  let buf = enc.encode(str)
  let proof = sha256.hash(buf).join('')
  while(proof[proof.length -1] !== '0') {
    y += 1

    str = String(x * y)
    buf = enc.encode(str)
    proof = sha256.hash(buf).join('')
  }
  return (proof)
}