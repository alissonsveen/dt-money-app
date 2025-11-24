import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request"
import { FC, useState } from "react"
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors"
import { useBottomSheetContext } from "@/context/bottomsheet.context"
import CurrencyInput from "react-native-currency-input"
import { transactionSchema } from "./schema"
import * as Yup from "yup"
import { AppButton } from "@/components/AppButton"
import { ErrorMessage } from "@/components/ErrorMessage"
import { useTransactionContext } from "@/context/transaction.context"
import { useErrorHandler } from "@/shared/hooks/useErrorHandler"
import { SelectCategoryModal } from "@/components/SelectCategoryModal"
import { TransactionTypesSelector } from "@/components/SelectType"
import { Transaction } from "@/shared/interfaces/transaction"

type ValidationErrosTypes = Record<keyof UpdateTransactionInterface, string>

interface Params {
    transaction: Transaction
}

export const EditTransactionForm: FC<Params> = ({ transaction: transactionToUpdate }) => {
  const { closeBottomSheet } = useBottomSheetContext()
  const { updateTransaction } = useTransactionContext()
  const { handleError } = useErrorHandler()

  const [loading, setLoading] = useState(false)

  const [transaction, setTransaction] = useState<UpdateTransactionInterface>({
    categoryId: transactionToUpdate.category.id,
    description: transactionToUpdate.description,
    id: transactionToUpdate.id,
    typeId: transactionToUpdate.type.id,
    value: transactionToUpdate.value,
  })
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrosTypes>()

  const handleUpdateTransaction = async () => {
    try {
      setLoading(true)
      await transactionSchema.validate(transaction, {
        abortEarly: false,
      })
      await updateTransaction(transaction)
      closeBottomSheet()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log("Validation errors:", error.errors)
        const errors = {} as ValidationErrosTypes

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof UpdateTransactionInterface] = err.message
          }
        })
        setValidationErrors(errors)
      } else {
        handleError(error, "Falha ao atualizar transação.")
      }
    } finally {
      setLoading(false)
    }
  }
  const setTransactionData = (
    key: keyof UpdateTransactionInterface,
    value: string | number
  ) => {
    setTransaction((prevData) => ({ ...prevData, [key]: value }))
  }
  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        onPress={closeBottomSheet}
        className="w-full flex-row items-center justify-between"
      >
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name="close" color={colors.gray[700]} size={20} />
      </TouchableOpacity>

      <View className="flex-1 my-8">
        <TextInput
          onChangeText={(text) => setTransactionData("description", text)}
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}
        <CurrencyInput
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
        />
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}
        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />
        {validationErrors?.categoryId && (
          <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
        )}

        <TransactionTypesSelector
          typeId={transaction.typeId}
          setTransactionTypes={(typeId) => setTransactionData("typeId", typeId)}
        />
        {validationErrors?.typeId && (
          <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
        )}

        <View className="my-4">
          <AppButton onPress={handleUpdateTransaction}>
            {loading ? <ActivityIndicator color={colors.white} /> : "Atualizar"}
          </AppButton>
        </View>
      </View>
    </View>
  )
}
