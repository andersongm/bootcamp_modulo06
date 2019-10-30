import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'lighter',
    },
    sectionTitle: {
        fontWeight: 'bold',
    },
    body: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default function App() {
    return (
        <SafeAreaView style={styles.body}>
            <Text style={styles.sectionTitle}>React App</Text>
        </SafeAreaView>
    );
}
