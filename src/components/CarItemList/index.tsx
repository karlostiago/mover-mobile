import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

interface Car {
    id: number;
    name: string;
    brand: string;
    year: number;
}

interface CarItemListProps {
    car: Car;
}

const Container = styled.View`
    border-width: 1px;
    border-color: #ccc;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
`;

const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const ScrollContainer = styled.ScrollView`
    flex: 1;
    padding: 10px;
`;

const CarItemList = ({ car }: CarItemListProps) => {
    return (
        <ScrollContainer>
            <Container>
                <Title>{car.name}</Title>
                <Text>{car.brand}</Text>
                <Text>{car.year}</Text>
            </Container>
        </ScrollContainer>
    );
};

export default CarItemList;
