
import {Platform} from "react-native";
import {createBottomTabNavigator, BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useTheme} from "native-base";

import HomeSvg from '@assets/home.svg';
import ProfileSvg from '@assets/profile.svg';
import MainTenanceSvg from '@assets/maintenance.svg';
import SearchSvg from '@assets/search.svg';
import ViolationSvg from '@assets/traffic-light-violation.svg';

import {Infraction} from "@screens/Infraction";
import {Inspection} from "@screens/Inspection";
import {Maintenance} from "@screens/Maintenance";
import {Profile} from "@screens/Profile";
import {Home} from "@screens/Home";

type AppRoutes = {
    home : undefined;
    infraction : undefined;
    inspection : undefined;
    maintenance : undefined;
    profile : undefined;
}


export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen} = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
    const {sizes, colors} = useTheme();
    const iconSize = sizes[6];

    return (
        <Navigator
            screenOptions={{
                headerShown: false ,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.green[500],
                tabBarInactiveTintColor: colors.gray[200],
                tabBarStyle: {
                    backgroundColor: colors.gray[600],
                    borderTopWidth: 0,
                    height: Platform.OS === 'android' ? 'auto' : 96,
                    paddingBottom: sizes[8],
                    paddingTop: sizes[6],
                }
        }}>
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({color}) => (
                        <HomeSvg width={iconSize} height={iconSize} fill={color} />
                    )
                }}
            />

            <Screen
                name="infraction"
                component={Infraction}
                options={{
                    tabBarIcon: ({color}) => (
                        <ViolationSvg width={iconSize} height={iconSize} fill={color} />
                    )
                }}
            />

            <Screen
                name="inspection"
                component={Inspection}
                options={{
                    tabBarIcon: ({color}) => (
                        <SearchSvg width={iconSize} height={iconSize} fill={color} />
                    )
                }}
            />

            <Screen
                name="maintenance"
                component={Maintenance}
                options={{
                    tabBarIcon: ({color}) => (
                        <MainTenanceSvg width={iconSize} height={iconSize} fill={color} />
                    )
                }}
            />

            <Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({color}) => (
                        <ProfileSvg width={iconSize} height={iconSize} fill={color} />
                    )
                }}
            />

        </Navigator>
    );
}