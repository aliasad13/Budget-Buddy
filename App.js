import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto } from '@expo/vector-icons';
import { Image } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import CustomTabIcon from "./components/CustomTabIcon";
import {GlobalStyles} from "./constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import IconButtons from "./components/IconButton";


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview(){
  return (

      /*normally we pass the screen options like, we are just passing an object to screen options
      screenOptions={{
          tabBarStyle: { position: 'absolute'}
          }}
          but with the way we have given below, that is passing a function that returns an object, we get an option to get the navigation option and set navigations to header icons */
      <BottomTab.Navigator
      screenOptions={({navigation}) => ({
          tabBarStyle: { position: 'absolute',
              backgroundColor: GlobalStyles.colors.primary10,
              opacity: .9,
              height: 90,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20},
          tabBarActiveTintColor: GlobalStyles.colors.primary50,

          headerTitleAlign: 'center',
          headerStyle: {
              backgroundColor: 'black',  //#a4c765
              height: 100,
              opacity: 1,
              shadowColor: "black",
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 20,
          },
          headerTintColor: "white",
          headerRight: () => {
           return(
               <IconButtons
                   name={'ios-add'}
                   color={'red'}
                   navigation={navigation}
               />
           )
          }


      })}
      >

        <BottomTab.Screen
            name={"RecentExpenses"}
            component={RecentExpenses}
            options={{
                title: 'Recent',
                tabBarIcon:  ({ focused }) => <CustomTabIcon focused={focused}  icon={<Fontisto name="hourglass-end" size={24} color="black" />} />,
                headerTitle: props => (
                    <Fontisto style={{marginBottom: 10}} name="wallet" size={35} color="white" />
                ),
            }}/>

        <BottomTab.Screen
            name={"AllExpenses"}
            component={AllExpenses}
        options={{
            title: "All Expenses",
            tabBarIcon:({ focused }) => <CustomTabIcon focused={focused}  icon={<FontAwesome5 name="money-bill-alt" />} />
        }}
        />

      </BottomTab.Navigator>
  )
}

export default function App() {
  return (
<NavigationContainer>
  <Stack.Navigator
      screenOptions={{
          headerShown: false,
      contentStyle: {backgroundColor: "black"}}}>

      <Stack.Screen
          name={"ExpensesOverview"}
          component={ExpensesOverview}
          options={{
              headerTitle: props => (
                  <Fontisto style={{marginBottom: 10}} name="wallet" size={35} color="#a4c765" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                  backgroundColor: '#2a2f20',  //#a4c765
                  height: 120,

              },
              contentStyle: {backgroundColor: "#2a2f20"}
              // headerTitleContainerStyle: {
              //     height: 120, // Adjust the height as per your requirement
              // },
              // headerTitleStyle: {
              //     fontSize: 24, // Adjust the font size if needed
              // },
          }}
      />

    <Stack.Screen
        name={"ManageExpense"}
        component={ManageExpense}
        options={{
            title: 'Manage Expense',
            headerStyle: {backgroundColor: 'black'},
            headerShown: true,
            headerTintColor: "white",
            contentStyle: {backgroundColor: "#361869"},
            presentation: "modal",
        }}
    />
    {/* this will be the default page, since its given to the first screen of bottom tab to display, it will be displayed by the first screen for both tab and stack*/}




  </Stack.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
