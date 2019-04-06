// https://hackernoon.com/learn-blockchains-by-building-one-117428612f46
// https://www.savjee.be/2018/10/Signing-transactions-blockchain-javascript/

import {sha256} from './hash'
import {ITransaction, IConfig} from './models'
import {ToyBlock} from './ToyBlock'

export class ToyChain {
  private chain:Array<ToyBlock>
  private pendingTransactions: Array<ITransaction>
  private readonly miningDifficulty: number
  private readonly reward: number
  constructor(config: IConfig) {
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

  _GenDifficultyKey() { return Array(this.miningDifficulty + 1).join('0') }
  validateNonce(lastNonce: number, nonce: number, prefixKey: string):boolean {
    const hash: string = sha256(String(lastNonce * nonce))
    return hash.substring(0, this.miningDifficulty) === prefixKey
  }
  mineNonce(lastNonce: number): number {
    let nonce: number = 0
    const prefixKey: string = this._GenDifficultyKey()
    while (!this.validateNonce(lastNonce, nonce, prefixKey)) {
      nonce += 1
    }
    return nonce
  }
}
