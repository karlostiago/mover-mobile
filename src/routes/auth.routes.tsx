import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Signin } from "@screens/Signin";
import { Signup } from "@screens/Signup";
import { BackScreen } from "@screens/BackScreen";
import { ValidationCodeScreen } from '@screens/ValidationCodeScreen';
import { ValidationCodeScreenError } from '@screens/ValidationCodeScreenError';
import { PasswordSetupScreen } from '@screens/PasswordSetupScreen';
import { ScreenPasswordError } from '@screens/ScreenPasswordError';
import { Client } from '@dtos/Client';
import { LoginScreen } from '@screens/LoginScreen';
import { Home } from '@screens/Home';

type AuthRoutes = {
    signIn: { client: Client };
    backScreen: undefined;
    validationCodeScreenError: undefined;
    screenPasswordError: undefined;
    signUp: { client: Client };
    validationCodeScreen: { client: Client };
    passwordSetupScreen: { client: Client }; 
    login: undefined
    home: undefined;
};

export type AuthNavigatorAuthProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
   return (
       <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="signIn" component={Signin} />
            <Screen name="signUp" component={Signup} />
            <Screen name="backScreen" component={BackScreen} />
            <Screen name="validationCodeScreen" component={ValidationCodeScreen} />
            <Screen name="validationCodeScreenError" component={ValidationCodeScreenError} />
            <Screen name='passwordSetupScreen' component={PasswordSetupScreen} />
            <Screen name='screenPasswordError' component={ScreenPasswordError} />
            <Screen name='login' component={LoginScreen} />
            <Screen name='home' component={Home} />
       </Navigator>
   );
}
