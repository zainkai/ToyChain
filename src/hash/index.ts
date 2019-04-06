import crypto from 'crypto'
import {THashFunc} from '../models'

export const sha256 = (buf:string):string => 
  crypto.createHash('sha256').update(buf).digest('hex')

export const blockHash: THashFunc = (block, nonce) => {
  return sha256(`
    ${block.index}
    ${block.timestamp}
    ${JSON.stringify(block.transactions)}
    ${nonce}
    ${block.previousHash}
    ${block.miningDifficulty}
  `)
}
