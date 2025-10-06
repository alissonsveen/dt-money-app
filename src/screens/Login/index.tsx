import { DismissKeyBoardView } from "@/components/DismissKeyBoardView";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const Login = () => {
  return (
    <DismissKeyBoardView>
      <View className="flex-1 w-[82%] self-center"></View>
    </DismissKeyBoardView>
  );
};
