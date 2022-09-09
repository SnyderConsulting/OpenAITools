import React from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import Main from "./Main";

export default function App() {
    return (
        <ChakraProvider>
            <Main />
        </ChakraProvider>
    )
}