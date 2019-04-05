import {ToyChain} from './src/ToyChain'
import {genProof} from './src/hash'

const tc = new ToyChain()
// const genesisBlock = tc.newBlock(0)
// const genesisHash = tc.hash(genesisBlock)

// tc.newTransaction('senderId1', 'senderId2', 5)
// tc.newTransaction('senderId2', 'senderId3', 5)
// const block1 = tc.newBlock(324984774000, genesisHash)
// const hashB1 = tc.hash(block1)


// tc.newTransaction('senderId2', 'senderId1', 5)
// tc.newTransaction('senderId3', 'senderId2', 5)
// const block2 = tc.newBlock(11, hashB1)
// const hashB2 = tc.hash(block2)

// console.log(genesisHash)
// console.log(hashB1)
// console.log(hashB2)


// mining

console.log(genProof(5))
console.log(tc.validateProof(5,22))