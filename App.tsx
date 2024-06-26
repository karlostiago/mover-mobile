import {StatusBar} from "react-native";
import {useFonts, Roboto_700Bold} from "@expo-google-fonts/roboto";
import {NativeBaseProvider} from "native-base";
import {Loading} from "@components/Loading/Loading";
import {Routes} from "@routes/index";
import {THEME} from "./src/theme";

export default function App() {
    const [fontsLoaded] = useFonts({Roboto_700Bold})
    return (

        <NativeBaseProvider theme={THEME}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            {fontsLoaded ? <Routes/> : <Loading/>}
        </NativeBaseProvider>
    );
}


