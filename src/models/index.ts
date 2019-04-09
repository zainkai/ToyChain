export interface IToyBlock {
  readonly index: number,
  readonly timestamp?: number|string
  readonly previousHash: string
  readonly transactions: Array<ITransaction>
  readonly difficulty?: number
}

export interface ITransaction {
  readonly sender: string // UUID
  readonly recipient: string // UUID
  readonly amount: number
  readonly note?: string
}

export interface IConfig {
  miningDifficulty?: number
  reward?: number
}

export type THashFunc = (block: IToyBlock, nonce: number) => string
export type TCurriedHashFunc = (nonce: number) => string
