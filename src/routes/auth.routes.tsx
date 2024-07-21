import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Signin } from "@screens/Signin";
import { Signup } from "@screens/Signup";
import { BackScreen } from "@screens/BackScreen";
import { ValidationCodeScreen } from '@screens/ValidationCodeScreen';
import { ValidationCodeScreenError } from '@screens/ValidationCodeScreenError';
import { PasswordSetupScreen } from '@screens/PasswordSetupScreen';

type AuthRoutes = {
    signIn: undefined;
    signUp: { client: { id: number; email: string; number: string; } };
    backScreen: undefined;
    validationCodeScreen: { client: { id: number; email: string; number: string; } };
    passwordSetupScreen: { client: { id: number; password: string; confirmPassword: string; }};
    validationCodeScreenError: undefined;
}

export type AuthNavigatorAuthProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
   return (
       <Navigator screenOptions={{ headerShown: false }}>

            <Screen
              name="signIn"
              component={Signin}
            />

           <Screen
               name="signUp"
               component={Signup}
           />

            <Screen
               name="backScreen"
               component={BackScreen}
           />

            <Screen
               name="validationCodeScreen"
               component={ValidationCodeScreen}
           />

            <Screen
               name="validationCodeScreenError"
               component={ValidationCodeScreenError}
           />

           <Screen
               name='passwordSetupScreen'
               component={PasswordSetupScreen}
          />
       </Navigator>
   );
}
