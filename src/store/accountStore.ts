import { create } from 'zustand'
import accountsData from '../data/accounts.json'
import type { Account } from '../types'

interface AccountStore {
  accounts: Account[]
  updateBalance: (accountId: string, amount: number) => void
}

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: accountsData as Account[],
  updateBalance: (accountId, amount) =>
    set((state) => ({
      accounts: state.accounts.map((acc) =>
        acc.id === accountId ? { ...acc, balance: acc.balance + amount } : acc
      ),
    })),
}))