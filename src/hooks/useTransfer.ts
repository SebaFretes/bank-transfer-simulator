import { useTransferStore } from '../store/transferStore'
import { useAccountStore } from '../store/accountStore'
import type { Transfer } from '../types'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

export function useTransfer() {
  const { t } = useTranslation()
  const { addTransfer } = useTransferStore()
  const { accounts, updateBalance } = useAccountStore()

  const execute = (fromId: string, toId: string, amount: number): boolean => {
    if (fromId === toId) {
      toast.error(t('transfer.errors.sameAccount'))
      return false
    }

    if (!amount || amount <= 0) {
      toast.error(t('transfer.errors.invalidAmount'))
      return false
    }

    const from = accounts.find((a) => a.id === fromId)
    if (!from || from.balance < amount) {
      toast.error(t('transfer.errors.insufficientFunds'))
      return false
    }

    const transfer: Transfer = {
      id: uuidv4(),
      fromAccountId: fromId,
      toAccountId: toId,
      amount,
      timestamp: new Date(),
    }

    updateBalance(fromId, -amount)
    updateBalance(toId, amount)
    addTransfer(transfer)
    toast.success(t('transfer.success'))
    return true
  }

  return { execute, accounts }
}
