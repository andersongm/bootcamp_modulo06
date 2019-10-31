import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Form, Input, SubmitButton } from './styles';

export default function Main() {
    return (
        <>
            <Container />
            <Form>
                <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Adicionar Usuário"
                />

                <SubmitButton>
                    <Icon name="add" size={20} color="#7159c1" />
                </SubmitButton>
            </Form>
        </>
    );
}

Main.navigationOptions = {
    title: 'Usuários',
};
