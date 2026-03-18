import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Transfer } from '../types'

interface TransferStore {
  transfers: Transfer[]
  addTransfer: (transfer: Transfer) => void
}

export const useTransferStore = create<TransferStore>()(
  persist(
    (set) => ({
      transfers: [],
      addTransfer: (transfer) =>
        set((state) => ({
          transfers: [...state.transfers, transfer],
        })),
    }),
    {
      name: 'transfer-storage',
    }
  )
)
