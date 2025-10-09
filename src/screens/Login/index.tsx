import { DismissKeyBoardView } from "@/components/DismissKeyBoardView";
import { View } from "react-native";
import { LoginForm } from "./LoginForm";
import { AuthHeader } from "@/components/AuthHeader";
import { useAuthContext } from "@/context/auth.context";

export const Login = () => {
  const { user } = useAuthContext();
  return (
    <DismissKeyBoardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <LoginForm />
      </View>
    </DismissKeyBoardView>
  );
};
