import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import { ScrollView, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';


class SideMenu extends Component {

    static navigationOptions =  ({navigation}) => ({
        title: "SideMenu",
    })
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render () {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                    <Text style={styles.sectionHeadingStyle}>
                        Retour à l'accueil
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Search")}>
                    <Text style={styles.sectionHeadingStyle}>
                        Gérer mes films
                    </Text>
                </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Tv")}>
                        <Text style={styles.sectionHeadingStyle}>
                            Gérer mes séries
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={styles.sectionHeadingStyle}>

                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={styles.sectionHeadingStyle}>

                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Text>This is my fixed footer</Text>
                </View>
            </SafeAreaView>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default SideMenu;
