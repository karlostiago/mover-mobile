import {VStack} from 'native-base'
import {ScreeanHeader} from "@components/ScreenHeader/ScreeanHeader";

export function Inspection() {
    return (
        <VStack flex={1}>
            <ScreeanHeader title="Histórico de Inspeções"/>
        </VStack>
    );
}