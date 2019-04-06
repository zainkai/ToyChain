import {IToyBlock, ITransaction} from './models'
import {sha256} from './hash'

export class ToyBlock implements IToyBlock {
  readonly index: number
  readonly timestamp: number|string
  readonly transactions: Array<ITransaction>
  readonly previousHash: string
  readonly miningDifficulty: number
  private nonce: number
  private hash: string
  constructor(block: IToyBlock) {
    this.index = block.index
    this.timestamp = new Date(Date.now()).toISOString()
    this.transactions = [...block.transactions]
    this.nonce = 0
    this.previousHash = block.previousHash
    this.hash = ''
    this.miningDifficulty = block.miningDifficulty || 3
  }
  private genBlockHash(): string {
    return sha256(`${this.index}${this.timestamp}${JSON.stringify(this.transactions)}${this.nonce}${this.previousHash}${this.miningDifficulty}`)
  }
  private _GenDifficultyKey() { return Array(this.miningDifficulty + 1).join('0') }

  public mineBlock() {
    const prefixKey: string = this._GenDifficultyKey()
    while(this.hash.substring(0, this.miningDifficulty) !== prefixKey) {
      this.nonce++
      this.hash = this.genBlockHash()
    }
  }
  public hasValidTransactions() {
    return true // TODO: implement
  }
  public getNonce(): number { return this.nonce }
  public getHash(): string { return this.hash }
}