import {ToyChain} from './src/ToyChain'
import {ToyBlock} from './src/ToyBlock'
import {blockHash} from './src/hash'
import {TCurriedHashFunc} from './src/models'

const tc = new ToyChain({ 
    miningDifficulty: 5
 })
const genesis = tc.genBlock()
const t = new ToyBlock({
    transactions: [],
    previousHash: genesis.getHash(),
    index: 0
})
t.mineBlock()

const genesisHash = genesis.getHash()
const genesisNonce = genesis.getNonce()
console.log(genesis)
console.log(t)

console.log(genesis.validateHash(genesisHash))
console.log(genesis.validateNonce(genesisNonce))