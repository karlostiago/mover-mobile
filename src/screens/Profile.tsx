import {VStack} from 'native-base'
import {ScreeanHeader} from "@components/ScreenHeader/ScreeanHeader";

export function Profile() {
    return (
        <VStack flex={1}>
            <ScreeanHeader title="Perfil"/>
        </VStack>
    );
}