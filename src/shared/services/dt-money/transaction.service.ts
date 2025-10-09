import { dtMoneyAPi } from "@/shared/api/dt-money";
import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";

export const getTransactionsCategories = async (): Promise<
  TransactionCategory[]
> => {
  const { data } = await dtMoneyAPi.get<TransactionCategory[]>(
    "/transaction/categories"
  );
  return data;
};
