// https://hackernoon.com/learn-blockchains-by-building-one-117428612f46

import {myHash} from './src/hash'
import {IBlock, ITransaction} from './src/models'
import * as sha256 from 'fast-sha256'


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

  /**
   * does hash(lastProof, proof) contain 4 leading zeroes?
   * @param lastProof previous proof
   * @param proof current proof
   */
  validateProof(lastProof: number, proof: number):boolean {
    const guessStr: string = `${lastProof}${proof}`
    const enc = new TextEncoder()
    const guessBuf: Uint8Array = enc.encode(guessStr)
    const hashedGuess: string = String(sha256.hash(guessBuf))

    return hashedGuess.substring(0,4) === '0000'
  }
  proofOfWork(lastProof: number): number {
    let proof: number = 0
    while (!this.validateProof(lastProof, proof)) {
        proof += 1
    }
    return proof
  }
}

const tc = new ToyChain()
tc.newTransaction('1', '2', 5)
tc.newTransaction('2', '3', 5)
