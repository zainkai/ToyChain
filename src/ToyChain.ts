// https://hackernoon.com/learn-blockchains-by-building-one-117428612f46

import {myHash, sha256} from './hash'
import {IBlock, ITransaction} from './models'

export class ToyChain {
  private chain:Array<IBlock>
  private pendingTransctions: Array<ITransaction>
  private _HashFunc:(block: IBlock) => string
  private miningDifficulty: number

  constructor() {
    this.chain = []
    this.pendingTransctions = []
    this._HashFunc = myHash
    this.miningDifficulty = 3
  }

  setDifficulty(x: number) { this.miningDifficulty = x }
  setHashFunc(hashFunc: (b:IBlock)=> string) { this._HashFunc = hashFunc}
  hash(block: IBlock): string { return this._HashFunc(block) }

  newBlock(nonce: number, previousHash:string = ''): IBlock {
    const block: IBlock = {
      index: this.chain.length,
      timestamp: new Date(Date.now()).toISOString(),
      transactions: [...this.pendingTransctions],
      nonce,
      previousHash
    }
    // reset transactions
    this.pendingTransctions = []
    this.chain.push(block)

    return block
  }

  lastBlock(): IBlock { return this.chain[this.chain.length -1]}

  newTransaction(sender: string, recipient: string, amount: number): IBlock {
    this.pendingTransctions.push({
      sender, recipient, amount
    } as ITransaction)

    return this.lastBlock()
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
