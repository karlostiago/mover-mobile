import {StatusBar} from "react-native";
import {useFonts} from "@expo-google-fonts/ubuntu";
import {NativeBaseProvider} from "native-base";
import {Loading} from "@components/Loading/Loading";
import {Routes} from "@routes/index";
import {THEME} from "./src/theme";

export default function App() {
    const [fontsLoaded] = useFonts({
        'UbuntuMono-Bold': require('./src/fonts/UbuntuMono-Bold.ttf'),
        'UbuntuMono-R': require('./src/fonts/UbuntuMono-R.ttf')
    });
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


