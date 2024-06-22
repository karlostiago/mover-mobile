import {Center, Text, VStack} from 'native-base'
import {HomeHeader} from "@components/HomeHeader/HomeHeader";

export function Home() {
    return (
        <VStack flex={1}>
            <HomeHeader/>
        </VStack>
    );
}