import {IToyBlock, ITransaction, THashFunc} from './models'
import {blockHash} from './hash'

export class ToyBlock implements IToyBlock {
  readonly index: number
  readonly timestamp: number|string
  readonly transactions: Array<ITransaction>
  readonly previousHash: string
  readonly difficulty: number
  private nonce: number
  private hash: string
  private readonly hashFunc: THashFunc
  constructor(block: IToyBlock) {
    this.index = block.index
    this.timestamp = new Date(Date.now()).toISOString()
    this.transactions = [...block.transactions]
    this.nonce = 0
    this.previousHash = block.previousHash
    this.hash = ''
    this.difficulty = block.difficulty || 3
    this.hashFunc = blockHash
  }
  private genBlockHash(): string {
    const self = this.getSelf()
    return this.hashFunc(self, this.nonce)
  }
  private _GenDifficultyKey() { return Array(this.difficulty + 1).join('0') }

  public mineBlock() {
    const prefixKey: string = this._GenDifficultyKey()
    while(this.hash.substring(0, this.difficulty) !== prefixKey) {
      this.nonce++
      this.hash = this.genBlockHash()
    }
  }
  public hasValidTransactions() {
    return true // TODO: implement
  }
  public getNonce(): number { return this.nonce }
  public getHash(): string { return this.hash }
  public getSelf(): IToyBlock { return this }
}