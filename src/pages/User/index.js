import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    Loading,
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
        loading: false,
        page: 1,
    };

    async componentDidMount() {
        const { page } = this.state;

        this.loadData(page);
    }

    async loadData(page) {
        const { navigation } = this.props;
        const user = navigation.getParam('user');
        let actualPage = page;

        this.setState({
            loading: true,
        });

        const response = await api.get(`/users/${user.login}/starred`, {
            params: {
                page: actualPage,
            },
        });

        console.tron.log(response.data);

        if (response.data.length() === 0) {
            console.tron.log('Teste');
            actualPage = 1;
        }

        console.tron.log(actualPage);

        this.setState({
            stars: response.data,
            loading: false,
            page: actualPage,
        });
    }

    loadMore = () => {
        const { page } = this.state;

        this.loadData(page + 1);

        // this.setState({
        //     page: page + 1,
        // });
    };

    render() {
        const { navigation } = this.props;
        const { stars, loading } = this.state;

        const user = navigation.getParam('user');

        return (
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>

                {loading ? (
                    <Loading />
                ) : (
                    <Stars
                        data={stars}
                        onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
                        onEndReached={this.loadMore} // Função que carrega mais itens
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
                    />
                )}
            </Container>
        );
    }
}
