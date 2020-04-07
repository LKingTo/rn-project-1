import React from 'react'
// import WIcon from '../components/WIcon/WIcon';
import { View, Platform } from 'react-native'
import { getSize } from 'react-native-program-stylesheet'

export const navigationOptions = {
    headerTitleStyle: {
        fontSize: getSize(17),
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    headerTintColor: '#fff',
    headerStyle: {
        height: getSize(45),
        backgroundColor: '#1E2850',
    },
    headerLeftContainerStyle: {
        paddingHorizontal: Platform.OS === 'ios' ? getSize(15) : getSize(3),
    },
    headerBackTitle: null,
    headerRight: <View />,
    // headerBackImage: ({tintColor}) => {
    //   return <WIcon name={'left'} size={23} color={tintColor} />;
    // },
}

export const bottomTabNavigationOptions = {
    tabBarOptions: {
        activeTintColor: '#3F5FCE',
        inactiveTintColor: '#999',
        style: {
            borderTopColor: '#e1e1e1',
            height: getSize(50),
        },
    },
}
