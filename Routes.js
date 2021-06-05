import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {MaterialIcons} from '@expo/vector-icons'
import Contacts from './screens/Contacts'
import Profile from './screens/Profile'
import Favourites from './screens/Favourites'
import User from './screens/User'
import Options from './screens/Options'
import colors from './utils/colors'
const ContactStack=createStackNavigator()
const FavouriteStack=createStackNavigator()
const UserStack=createStackNavigator()
const Tab=createBottomTabNavigator()
const getTabBarIcon=icon=>({tintColor})=>(
    <MaterialIcons name={icon} size={26} style={{color:tintColor}}/>
)
function ContactStackComponent(){
    return(
        <ContactStack.Navigator initialRouteName="Contacts">
            <ContactStack.Screen name="Profile" component={Profile} options={({route})=>({title:route.params.name})}/>
            <ContactStack.Screen name="Contacts" component={Contacts} options={{headerStyle:{backgroundColor:'white'}}}/>
        </ContactStack.Navigator>
    )
}
function FavouriteStackComponent(){
    return(
        <FavouriteStack.Navigator initialRouteName="Favourites">
            <FavouriteStack.Screen name="Profile" component={Profile} options={({route})=>({title:route.params.name})}/>
            <FavouriteStack.Screen name="Favourites" component={Favourites}/>  
        </FavouriteStack.Navigator>
    )
}
function MeComponent(){
    return(
        <UserStack.Navigator>
            <UserStack.Screen name="Me" component={User}/>
            <UserStack.Screen name="Options" component={Options}/>
        </UserStack.Navigator>
    )
}
export default function Routes(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    style:{
                        backgroundColor:colors.greyLight
                    },
                    showLabel:true,
                    showIcon:true,
                    activeTintColor:colors.blue,
                    inactiveTintColor:colors.greyDark,
                    renderIndicator:()=>null
                }}>
                <Tab.Screen name="Contacts" options={{tabBarIcon:getTabBarIcon('list')}} component={ContactStackComponent}/>
                <Tab.Screen name="Favourite"  options={{tabBarIcon:getTabBarIcon('star')}} component={FavouriteStackComponent}/>
                <Tab.Screen name="Me"  options={{tabBarIcon:getTabBarIcon('person')}} component={MeComponent}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}
