import {ToyChain} from './src/ToyChain'

const tc = new ToyChain()
tc.newTransaction('1', '2', 5)
tc.newTransaction('2', '3', 5)
const block1 = tc.newBlock(10)

tc.newTransaction('2', '1', 5)
tc.newTransaction('3', '2', 5)
const block2 = tc.newBlock(11)