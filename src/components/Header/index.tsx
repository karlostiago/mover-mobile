import React from 'react';
import styled from 'styled-components/native';

interface HeaderProps {
    title: string;
}

const HeaderContainer = styled.View`
    background-color: #06569f;
    padding-vertical: 20px;
    align-items: center;
    margin-bottom: 10px;
`;

const HeaderText = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`;

export function Header({ title }: HeaderProps) {
    return (
        <HeaderContainer>
            <HeaderText>{title}</HeaderText>
        </HeaderContainer>
    );
}
