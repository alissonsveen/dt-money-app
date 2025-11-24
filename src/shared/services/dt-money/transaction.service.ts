import { dtMoneyAPi } from "@/shared/api/dt-money"
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request"
import {
  GetTransactionsParams,
  GetTransactionsResponse,
} from "@/shared/interfaces/https/get-transactions-request"
import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response"
import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request"
import qs from "qs"

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

export const getTransactions = async (
  params: GetTransactionsParams
): Promise<GetTransactionsResponse> => {
  const { data } = await dtMoneyAPi.get<GetTransactionsResponse>(
    "/transaction",
    {
      params,
      paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
    }
  )

  return data
}

export const deleteTransaction = async (id: number) => {
  await dtMoneyAPi.delete(`/transaction/${id}`)
}


export const updateTransaction = async (transaction: UpdateTransactionInterface) => {
  await dtMoneyAPi.put("/transaction", transaction)
}