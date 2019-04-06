// https://hackernoon.com/learn-blockchains-by-building-one-117428612f46
// https://www.savjee.be/2018/10/Signing-transactions-blockchain-javascript/

import {sha256} from './hash'
import {ITransaction, IConfig} from './models'
import {ToyBlock} from './ToyBlock'


type hasherFunc = (tempNonce?: number) => string
export class ToyChain {
  private chain:Array<ToyBlock>
  private pendingTransactions: Array<ITransaction>
  private readonly miningDifficulty: number
  private readonly reward: number
  constructor(config: IConfig = {}) {
    this.chain = []
    this.pendingTransactions = []
    this.miningDifficulty = config.miningDifficulty || 3
    this.reward = config.reward || 10
  }

  getLastBlock(): ToyBlock|null {
    return this.chain[this.chain.length -1] || null
  }

  // this allows multiple genesis blocks
  genGenesisBlock(): ToyBlock {
    const {miningDifficulty} = this
    const genesis = new ToyBlock({
      index: this.chain.length,
      miningDifficulty,
      transactions: [],
      previousHash: ''
    })
    genesis.mineBlock()
    this.chain.push(genesis)
    return genesis
  }

  addTransaction(sender: string, recipient: string, amount: number) {
    this.pendingTransactions.push({
      sender, recipient, amount
    } as ITransaction)
  }

  mineTransactions() {

  }

  _GenDifficultyKey() { return Array(this.miningDifficulty + 1).join('0') }

  
  validateNonce(nonce: number, hasher: hasherFunc): void {
    const prefixKey: string = this._GenDifficultyKey()
    let genNonce = 0
    let genHash = hasher(0)

    console.log('sadasd'+ genHash)
    while(genHash.substring(0, this.miningDifficulty) !== prefixKey) {
      genNonce += 1
      genHash = hasher(genNonce)
    }
    console.log(`${nonce} ${genNonce}`)
  }
}
