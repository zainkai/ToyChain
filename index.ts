import {ToyChain} from './src/ToyChain'
import {ToyBlock} from './src/ToyBlock'
import {blockHash} from './src/hash'
import {TCurriedHashFunc} from './src/models'

const tc = new ToyChain()
const t = new ToyBlock({
    transactions: [],
    previousHash: '',
    index: 0
})
t.mineBlock()


const curried:TCurriedHashFunc = (n) => blockHash(t, n)
console.log(tc.validateNonce(t.getNonce(), curried  ))
