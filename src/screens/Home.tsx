import {HStack, Text, VStack, Heading, FlatList} from 'native-base'
import {HomeHeader} from "@components/HomeHeader/HomeHeader";
import {Group} from "@components/Group/Group";
import {useState} from "react";
import {ContractCard} from "@components/ContractCard/ContractCard";

export function Home() {
    const [groups, setGroups] = useState(['Contratos','Clientes', 'Vistórias', 'Despesas']);
    const [contracts, setContracts] = useState(['CON-001', 'CON-002', 'CON-003 ', 'Flex1', 'Flex2', 'Flex3', 'Flex 4']);
    const [groupSelected, setGroupSelected] = useState('Contratos');

    return (
        <VStack flex={1}>
            <HomeHeader/>

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({item} ) => (
                    <Group
                        name={item}
                        isActive =  { groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
                        onPress={()=> setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator = {false}
                _contentContainerStyle={{px: 8}}
                my={10}
                maxH={10}
            />

            <VStack
                flex={1}
                px={8}
            >
            <HStack
                justifyContent="space-between"
            >

            <Heading
                color="gray.200"
                fontSize="md"
            >
                Contratos
            </Heading>

            <Text
               color="gray.200"
               fontSize="sm"
            >
                {contracts.length}
            </Text>

            </HStack>
                <FlatList
                    data={contracts}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <ContractCard/>
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{paddingBottom: 20}}
                />
            </VStack>
        </VStack>
    );
}