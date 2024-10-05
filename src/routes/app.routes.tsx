import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from "native-base";
import { Infraction } from "@screens/Infraction";
import { Inspection } from "@screens/Inspection";
import { Maintenance } from "@screens/Maintenance";
import { Profile } from "@screens/Profile";
import { Home } from "@screens/Home";

type AppRoutes = {
  home: undefined;
  infraction: undefined;
  inspection: undefined;
  maintenance: undefined;
  profile: undefined;
};

const Tab = createBottomTabNavigator<AppRoutes>();

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
        name="infraction"
        component={Infraction}
      />

      <Tab.Screen
        name="inspection"
        component={Inspection}
      />

      <Tab.Screen
        name="maintenance"
        component={Maintenance}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
