import { Client } from '@dtos/Client';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      signIn: undefined;
      signUp: {
        client: Client;
      };
      passwordSetupScreen: {
        client: Client;
      };
      validationCodeScreen: {
        client: Client; 
      };
      validationCodeScreenError: undefined;
      screenPasswordError: undefined;
    }
  }
}
