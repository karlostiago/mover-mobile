import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
}

const StyledButton = styled(TouchableOpacity)`
    background-color: #06569f;
    padding-vertical: 12px;
    padding-horizontal: 24px;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    margin-vertical: 10px;
`;

const ButtonText = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
`;

const Index = ({ title, onPress, ...rest }: ButtonProps) => {
    return (
        <StyledButton onPress={onPress} {...rest}>
            <ButtonText>{title}</ButtonText>
        </StyledButton>
    );
};

export default Index;
