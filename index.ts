// https://hackernoon.com/learn-blockchains-by-building-one-117428612f46

import {myHash} from './src/hash'
import {IBlock, ITransaction} from './src/models'



export class ToyChain {
  private chain:Array<IBlock> = []
  private currentTransactions: Array<ITransaction> = []
  private _hashFunc:(block: IBlock) => string = myHash
  constructor() {
    this.chain = []
    this.currentTransactions = []
    this._hashFunc = myHash
  }

  setHashFunc(hashFunc: (b:IBlock)=> string) {
    this._hashFunc = hashFunc
  }
  hash(block: IBlock) {
    this._hashFunc(block)
  }

  newBlock(proof: number, previousHash:string = ''): void {
    const block: IBlock = {
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: [...this.currentTransactions],
      proof,
      previousHash
    }

    // reset transactions
    this.currentTransactions = []

    this.chain.push(block)
  }

  lastBlock(): IBlock {
    return this.chain[this.chain.length -1]
  }

  newTransaction(sender: string, recipient: string, amount: number): IBlock {
    this.currentTransactions.push({
      sender, recipient, amount
    } as ITransaction)

    return this.lastBlock()
  }
}
