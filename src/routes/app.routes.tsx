import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from "native-base";
import { Infraction } from "@screens/Infraction";
import { Inspection } from "@screens/Inspection";
import { Maintenance } from "@screens/Maintenance";
import { Profile } from "@screens/Profile";
import { Home } from "@screens/Home";
import { LoginScreen } from '@screens/LoginScreen';
import { AutoInspection } from '@screens/AutoInspection';
import { PhotoAutoInspection } from '@screens/PhotoAutoInspection';
import { PhotoAutoInspectionFinished } from '@screens/PhotoAutoInspectionFinished';
import { ContractDTO } from '@dtos/Contract';

type AppRoutes = {
  home: undefined;
  infraction: undefined;
  inspection: { contract: ContractDTO };
  maintenance: undefined;
  profile: undefined;
  login: undefined;
  autoInspection:  { contract: ContractDTO };
  photoAutoInspection: { contract: any };
  photoAutoInspectionFinished: { contractId: number };
};

const Tab = createBottomTabNavigator<AppRoutes>();

export type AppNavigatorProps = BottomTabNavigationProp<AppRoutes>;


export function AppRoutes() {
  const { sizes, colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'none',
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
      />

     <Tab.Screen
        name="photoAutoInspection"
        component={PhotoAutoInspection}
      />

     <Tab.Screen
        name="photoAutoInspectionFinished"
        component={PhotoAutoInspectionFinished}
      />

      <Tab.Screen
        name="login"
        component={LoginScreen}
      />

      <Tab.Screen
        name="infraction"
        component={Infraction}
      />

<Tab.Screen name="inspection" component={Inspection} />

      <Tab.Screen
        name="maintenance"
        component={Maintenance}
      />


    <Tab.Screen
        name="autoInspection"
        component={AutoInspection}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
