import HomeScreen from './src/screens/home';
import {ThemeProvider} from "styled-components/native";
import theme from "@styles/index";
import React from "react";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <HomeScreen />
        </ThemeProvider>
    );
};


