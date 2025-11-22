import { dtMoneyAPi } from "@/shared/api/dt-money"
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request"
import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response"

export const getTransactionsCategories = async (): Promise<
  TransactionCategory[]
> => {
  const { data } = await dtMoneyAPi.get<TransactionCategory[]>(
    "/transaction/categories"
  )
  return data
}

export const createTransaction = async (
  transaction: CreateTransactionInterface
) => {
  await dtMoneyAPi.post("/transaction", transaction)
}
