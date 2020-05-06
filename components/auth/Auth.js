import React from 'react'
import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import * as RootNavigation from '../../RootNavigation'
import BirthDate from './signup/BirthDate'
import Congrats from './signup/Congrats'
import Ethnicity from './signup/Ethnicity'
import Login from './Login'
import Sex from './signup/Sex'
import SignUpNextButton from './signup/SignUpNextButton'
import UserInfo from './signup/UserInfo'

const Tab = createMaterialTopTabNavigator()

const Auth = (props) => {
    const {styles} = props
    return (
        <>
            <StatusBar barStyle='dark-content'/>
            <NavigationContainer ref={RootNavigation.navigationRef}>
                <Tab.Navigator
                    backBehavior='none'
                    initialRouteName='Login'
                    lazy={true}
                    swipeEnabled={false}
                    tabBarPosition={null}
                >
                    <Tab.Screen name='Login' component={Login}
                        initialParams={{styles: styles}}
                    />
                    <Tab.Screen name='UserInfo' component={UserInfo}
                        initialParams={{styles: styles}}
                    />
                    <Tab.Screen name='BirthDate' component={BirthDate}
                        initialParams={{styles: styles}}
                    />
                    <Tab.Screen name='Sex' component={Sex}
                        initialParams={{styles: styles}}
                    />
                    <Tab.Screen name='Ethnicity' component={Ethnicity}
                        initialParams={{styles: styles}}
                    />
                    <Tab.Screen name='Congrats' component={Congrats}
                        initialParams={{styles: styles}}
                    />
                </Tab.Navigator>
            </NavigationContainer>
            <SignUpNextButton styles={styles} />
        </>
    )
}

export default Auth
