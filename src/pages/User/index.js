import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

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
    ButtonReturn,
} from './styles';

import api from '../../services/api';

const styles = StyleSheet.create({
    btnReturn: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default class User extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('user').name,
    });

    static propTypes = {
        navigation: PropTypes.shape({
            getParam: PropTypes.func,
            navigate: PropTypes.func,
        }).isRequired,
    };

    state = {
        stars: [],
        loading: false,
        page: 1,
        refreshing: false,
    };

    async componentDidMount() {
        const { page } = this.state;

        this.loadData(page);
    }

    async loadData(page = 1) {
        const { navigation } = this.props;
        const user = navigation.getParam('user');
        const actualPage = page;

        this.setState({
            loading: true,
        });

        const response = await api.get(`/users/${user.login}/starred`, {
            params: {
                page: actualPage,
            },
        });

        console.tron.log(actualPage);
        console.tron.log(response);

        this.setState({
            stars: response.data,
            loading: false,
            page: actualPage,
        });
    }

    loadMore = () => {
        const { page, stars } = this.state;

        if (stars.length >= 30) {
            this.loadData(page + 1);
        }
    };

    refreshList = () => {
        this.setState({ refreshing: true, stars: [] }, this.load);
    };

    testReturn = () => {
        const page = 1;
        this.loadData(page);
    };

    listEmpty = () => {
        return (
            // View to show when list is empty
            <View>
                <ButtonReturn onPress={this.testReturn}>
                    <Text style={styles.btnReturn}>
                        No Data Found - Click to Return
                    </Text>
                </ButtonReturn>
            </View>
        );
    };

    handleNavigate = repository => {
        const { navigation } = this.props;
        console.tron.log('opa');
        navigation.navigate('Repository', { repository });
    };

    render() {
        const { navigation } = this.props;
        const { stars, loading, refreshing } = this.state;

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
                        onRefresh={this.refreshList}
                        refreshing={refreshing}
                        onEndReachedThreshold={0.5} // Carrega mais itens quando chegar em 20% do fim
                        onEndReached={this.loadMore} // Função que carrega mais itens
                        keyExtractor={star => String(star.id)}
                        renderItem={({ item }) => (
                            <Starred onPress={() => this.handleNavigate(item)}>
                                <OwnerAvatar
                                    source={{ uri: item.owner.avatar_url }}
                                />
                                <Info>
                                    <Title>{item.name}</Title>
                                    <Author>{item.owner.login}</Author>
                                </Info>
                            </Starred>
                        )}
                        // ListEmptyComponent={this.listEmpty}
                    />
                )}
            </Container>
        );
    }
}
