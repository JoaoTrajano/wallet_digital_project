export type WalletDigital = {
  id: string
  name: string
  amount: number
}

export type FetchOrdersOutputApi = {
  walletsDigital: WalletDigital[]
}
