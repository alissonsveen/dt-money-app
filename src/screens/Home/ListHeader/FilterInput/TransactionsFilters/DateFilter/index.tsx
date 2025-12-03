import { useTransactionContext } from "@/context/transaction.context"
import clsx from "clsx"
import { format, isValid } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker"

export const DateFilter = () => {
  const { filters, handleFilters } = useTransactionContext()

  const [showStartDatePicker,  setshowStartDatePicker]  = useState(false)
  const [showEndDatePicker,  setshowEndDatePicker]  = useState(false)

  const onStartCancel = () => {
    setshowStartDatePicker(false)
  }

  const onStartConfirm = (selectedDate: Date) => {
     setshowStartDatePicker(false)
      handleFilters({key: "from", value: selectedDate})
  }

  const onEndCancel = () => {
    setshowEndDatePicker(false)
  }

  const onEndConfirm = (selectedDate: Date) => {
    setshowEndDatePicker(false)
    handleFilters({key: "to", value: selectedDate})
  }

  const formatDate = (date?: Date ) => {
    if(!date || !isValid) {
      return undefined
    }
    return format(date, "dd/MM/yyyy", {
      locale: ptBR
    })
  }

    return (
        <>
          <Text className="text-gray-700 text-lg mb-6">Data</Text>

            <View className="flex-row justify-between mb-6">
              <View className="w-[48%]">
                <TouchableOpacity onPress={() => setshowStartDatePicker(true)} className="rounded-md p-2 border-b border-gray-800">
                  <Text className={clsx("text-lg", filters.from ? "text-white" : "text-gray-700")}>
                    {formatDate(filters.from) || "De"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="w-[48%]">
                <TouchableOpacity onPress={() => setshowEndDatePicker(true)} className="rounded-md p-2 border-b border-gray-800">
                  <Text className={clsx("text-lg", filters.from ? "text-white" : "text-gray-700")}>
                     {formatDate(filters.to) || "Até"}
                    </Text>
                </TouchableOpacity>
              </View>

              <DateTimePicker
                 isVisible={showStartDatePicker}
                 date={filters.from}
                 onCancel={onStartCancel}
                 onConfirm={onStartConfirm}
                 mode="date"
                 confirmTextIOS="Confirmar"
                 cancelTextIOS="Cancelar"
                 locale="pt_BR"
              />

               <DateTimePicker
                 isVisible={showEndDatePicker}
                 date={filters.to}
                 onCancel={onEndCancel}
                 onConfirm={onEndConfirm}
                 mode="date"
                 confirmTextIOS="Confirmar"
                 cancelTextIOS="Cancelar"
                 locale="pt_BR"
              />
            </View>
        </>
    )
}