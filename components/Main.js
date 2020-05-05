import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import * as RootNavigation from '../RootNavigation'
import {styles} from '../styles'
import BirthDate from './authentication/signup/BirthDate'
import Congrats from './authentication/signup/Congrats'
import Ethnicity from './authentication/signup/Ethnicity'
import Login from './authentication/Login'
import NextButton from './authentication/NextButton'
import Sex from './authentication/signup/Sex'
import UserInfo from './authentication/signup/UserInfo'

const Tab = createMaterialTopTabNavigator()

const Main = () => {
    return (
        <>
            <NavigationContainer ref={RootNavigation.navigationRef}>
                <Tab.Navigator
                    backBehavior='order'
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
            <NextButton styles={styles} />
        </>
    )
}

export default Main
