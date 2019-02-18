import {  Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation'
import SideMenu from '../Components/SideMenu/'
import StackNavigator from './StackNavigation'
import Home from '../Components/Home'

const DrawerNavigation = createDrawerNavigator({
    Home: {
        screen: StackNavigator,
    }
}, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 100,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
});

const AppDrawerNavigation = createAppContainer(DrawerNavigation)

export default AppDrawerNavigation
