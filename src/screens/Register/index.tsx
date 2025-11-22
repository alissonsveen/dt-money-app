import { DismissKeyBoardView } from "@/components/DismissKeyBoardView"
import { Text, View } from "react-native"
import { RegisterForm } from "./RegisterForm"
import { AuthHeader } from "@/components/AuthHeader"

export const Register = () => {
  return (
    <DismissKeyBoardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <RegisterForm />
      </View>
    </DismissKeyBoardView>
  )
}
