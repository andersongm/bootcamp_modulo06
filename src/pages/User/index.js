import React from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

export default function User({ navigation }) {
    const user = navigation.getParam('user');

    return (
        <View>
            <Text>{user.name}</Text>
        </View>
    );
}
