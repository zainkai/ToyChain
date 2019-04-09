// https://hackernoon.com/learn-blockchains-by-building-one-117428612f46
// https://www.savjee.be/2018/10/Signing-transactions-blockchain-javascript/

import {ITransaction, IConfig} from './models'
import {ToyBlock} from './ToyBlock'

export class ToyChain {
  private chain:Array<ToyBlock>
  private pendingTransactions: Array<ITransaction>
  private readonly difficulty: number
  private readonly reward: number
  constructor(config: IConfig = {}) {
    this.chain = []
    this.pendingTransactions = []
    this.difficulty = config.miningDifficulty || 3
    this.reward = config.reward || 10
  }

  getLastBlock(): ToyBlock|null {
    return this.chain[this.chain.length -1] || null
  }

  genBlock(): ToyBlock {
    const prevBlock = this.getLastBlock()
    let previousHash = ''
    if (prevBlock) {
      previousHash = prevBlock.getHash()
    }

    const genesis = new ToyBlock({
      index: this.chain.length,
      difficulty: this.difficulty,
      transactions: [...this.pendingTransactions],
      previousHash
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
  
  getBalance(address:string): number { 
    return 0 // TODO: implement
   }
}
