export interface IToyBlock {
  readonly index: number,
  readonly previousHash: string
  readonly transactions: Array<ITransaction>
  readonly miningDifficulty?: number
}

export interface ITransaction {
  sender: string // UUID
  recipient: string // UUID
  amount: number
}

export interface IConfig {
  miningDifficulty?: number
  reward?: number
}

