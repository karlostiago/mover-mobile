import React from 'react';
import styled from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';

interface TextInputComponentProps extends TextInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const InputContainer = styled.View`
    margin-bottom: 10px;
`;

const InputField = styled(TextInput)`
    border-width: 1px;
    border-color: #ccc;
    border-radius: 6px;
    padding: 10px;
    font-size: 16px;
`;

const TextInputComponent = ({ placeholder, value, onChangeText, ...rest }: TextInputComponentProps) => {
    return (
        <InputContainer>
            <InputField
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                {...rest}
            />
        </InputContainer>
    );
};

export default TextInputComponent;
