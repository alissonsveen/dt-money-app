import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";
import { createStackNavigator } from "@react-navigation/stack";

export type PublicStackParamsList = {
  Login: undefined;
  Register: undefined;
};

export const PublicRoutes = () => {
  const PublickStack = createStackNavigator<PublicStackParamsList>();
  return (
    <PublickStack.Navigator screenOptions={{ headerShown: false }}>
      <PublickStack.Screen name="Login" component={Login} />
      <PublickStack.Screen name="Register" component={Register} />
    </PublickStack.Navigator>
  );
};
