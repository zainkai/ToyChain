export interface IBlock {
  index: number,
  timestamp: number|string // epoch or ISO
  transactions: Array<ITransaction>,
  nonce: number,
  previousHash: string
}

export interface ITransaction {
  sender: string // UUID
  recipient: string // UUID
  amount: number
}
