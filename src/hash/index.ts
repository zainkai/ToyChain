import crypto from 'crypto'

export const sha256 = (buf:string):string => 
  crypto.createHash('sha256').update(buf).digest('hex')
