import {ToyChain} from './src/ToyChain'
import {ToyBlock} from './src/ToyBlock'
import {sha256} from './src/hash'

const tc = new ToyChain()
const t = new ToyBlock({
    transactions: [],
    previousHash: '',
    index: 0
})
t.mineBlock()

// console.log(t.getHash())
// console.log((t.genBlockHash(t.getNonce())))

const hasherFactory = (temp?:number) => {
  const str = ''
    + t.index
    + t.timestamp
    + JSON.stringify(t.transactions)
    + temp
    + t.previousHash
    + t.miningDifficulty

  return sha256(str)
}
console.log(tc.validateNonce(t.getNonce(),  hasherFactory ))
