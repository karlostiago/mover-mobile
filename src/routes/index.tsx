import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {AuthRoutes} from "@routes/auth.routes";
import {AppRoutes} from "@routes/app.routes";
import {useTheme, Box} from "native-base";


export function Routes() {
    const { colors } = useTheme();
    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    return (
     <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
          <AuthRoutes/>
      </NavigationContainer>
     </Box>
    );
}