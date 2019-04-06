export interface IToyBlock {
  readonly index: number,
  readonly timestamp?: number|string
  readonly previousHash: string
  readonly transactions: Array<ITransaction>
  readonly miningDifficulty?: number
}

export interface ITransaction {
  sender: string // UUID
  recipient: string // UUID
  amount: number
  note?: string
}

export interface IConfig {
  miningDifficulty?: number
  reward?: number
}

export type THashFunc = (block: IToyBlock, nonce: number) => string
export type TCurriedHashFunc = (nonce: number) => string
