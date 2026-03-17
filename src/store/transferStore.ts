import { create } from 'zustand'
import type { Transfer } from '../types'

interface TransferStore {
  transfers: Transfer[]
  addTransfer: (transfer: Transfer) => void
}

export const useTransferStore = create<TransferStore>((set) => ({
  transfers: [],
  addTransfer: (transfer) =>
    set((state) => ({
      transfers: [...state.transfers, transfer],
    })),
}))