import React from 'react';
import { FlatList } from 'react-native';
import CarItemList from '@components/CarItemList';
import {Header} from '@components/Header';
import styled from 'styled-components/native';

interface Car {
    id: number;
    name: string;
    brand: string;
    year: number;
}

const data: Car[] = [
    { id: 1, name: 'Carro A', brand: 'Marca A', year: 2020 },
    { id: 2, name: 'Carro B', brand: 'Marca B', year: 2021 },
    { id: 3, name: 'Carro C', brand: 'Marca C', year: 2019 },
    { id: 4, name: 'Carro D', brand: 'Marca D', year: 2018 },
    { id: 5, name: 'Carro E', brand: 'Marca E', year: 2022 },
    { id: 6, name: 'Carro F', brand: 'Marca F', year: 2023 },
    { id: 7, name: 'Carro g', brand: 'Marca G', year: 2023 },
    { id: 8, name: 'Carro h', brand: 'Marca G', year: 2023 },
    { id: 9, name: 'Carro i', brand: 'Marca G', year: 2023 },
    { id: 10, name: 'Carro j', brand: 'Marca G', year: 2023 },
    { id: 11, name: 'Carro k', brand: 'Marca G', year: 2023 },
    { id: 12, name: 'Carro l', brand: 'Marca G', year: 2023 },
    { id: 13, name: 'Carro m', brand: 'Marca G', year: 2023 },
    { id: 14, name: 'Carro n', brand: 'Marca G', year: 2023 },
    { id: 15, name: 'Carro o', brand: 'Marca G', year: 2023 },
    { id: 16, name: 'Carro p', brand: 'Marca G', year: 2023 },

];

const HomeScreen = () => {
    const renderItem = ({ item }: { item: Car }) => <CarItemList car={item} />;

    return (
        <Container>
            <Header
                title={'Mover'}
            />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
            />
            <Menu>
                <MenuItem>
                    <MenuText>Contratos</MenuText>
                </MenuItem>
                <MenuItem>
                    <MenuText>Clientes</MenuText>
                </MenuItem>
                <MenuItem>
                    <MenuText>Vistorias</MenuText>
                </MenuItem>
            </Menu>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
    padding-top: ${(props) => props.theme.spacing.paddingTop};
    padding-bottom: ${(props) => props.theme.spacing.paddingBottom};
`;


const Menu = styled.View`
    flex-direction: row;
    background-color: ${(props) => props.theme.colors.secondary};
    justify-content: space-around;
    border-top-width: 1px;
    border-top-color: ${(props) => props.theme.colors.secondary};
    padding-top: 15px; 
    padding-bottom: 20px;
`;

const MenuItem = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
`;

const MenuText = styled.Text`
    color: ${(props) => props.theme.colors.text};
    font-weight: bold;
`;

export default HomeScreen;
