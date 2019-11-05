import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from 'react-native';
import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';

import api from '../../services/api';

export default class User extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('user').name,
    });

    static propTypes = {
        navigation: PropTypes.shape({
            getParam: PropTypes.func,
        }).isRequired,
    };

    state = {
        stars: [],
        nome: 'Teste',
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const user = navigation.getParam('user');

        const response = api.get(`/users/${user.login}/starred`);

        const teste = response.data;

        teste.map(t => {
            console.log(t.name);
        });

        this.setState({
            stars: response.data,
            nome: 'Juca',
        });
    }

    render() {
        const { navigation } = this.props;
        const { stars, nome } = this.state;

        const user = navigation.getParam('user');

        return (
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>
                <Text>{nome}</Text>
                {/* <ScrollView
                    data={stars}
                    dataSource={stars}
                    keyExtractor={star => String(star.id)}
                    renderItem={({ item }) => (
                        <Starred>
                            <OwnerAvatar
                                source={{ uri: item.owner.avatar_url }}
                            />
                            <Info>
                                <Title>{item.name}</Title>
                                <Author>{item.owner.login}</Author>
                            </Info>
                        </Starred>
                    )}
                /> */}
            </Container>
        );
    }
}
