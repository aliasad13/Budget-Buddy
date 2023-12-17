import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
// import {useRoute} from "@react-navigation/native";
import {fetchExpenses} from "../util/http";
import DateTimePicker from '@react-native-community/datetimepicker';





function ManageExpense({route, navigation}) {

    // const route = useRoute();

    const expenseId = route.params?.id    // ? checks if params is defined, if not it wont move to id and returns undefined
    console.log("expenseId:", expenseId)
    const isEditable = !!expenseId       //If expenseId is truthy (i.e., it has a value other than undefined, null, 0, false, NaN, or an empty string),
                                            // then the first ! will turn it into false, and the second ! will turn that false back into true.
    console.log("isEditable:", isEditable)





   //date picker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [text, setText] = useState('Empty')

    const onDateChange = (event, selectedDate) =>{
            const currentDate = selectedDate || date;
            setShow(Platform.OS === "ios");
            setDate(currentDate)

        let tempDate = new Date(currentDate);
        let formattedDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
        let formattedTime = 'H:' + tempDate.getHours() + "M:" + tempDate.getMinutes() + 'S:' + tempDate.getHours()
        setText(formattedDate + '\n' + formattedTime)
        console.log(formattedDate + '\n' + formattedTime)

    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode);
    }



    const [expenses, setExpenses] = useState([]);
    const expense = expenses.find((expense) => expense.id === expenseId)

    const toggleDatePicker = () => {
        setShowPicker(!setShowPicker);
    };


    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditable ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditable]);



    useEffect(() => {
        async function getExpenses() {
            try {
                const response = await fetchExpenses();
                setExpenses(response); // Assuming that the response is an array of expenses
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        }
        getExpenses();
    }, []);


    console.log("expense: " + JSON.stringify(expense, null, 2))

    return(
        <View>
            {isEditable && (
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder={"Description"}/>
                    <TextInput style={styles.textInput} placeholder={"Amount"}/>

                    <TouchableOpacity style={styles.dateButton} onPress={() => showMode('date')}>
                        <Text>Pick Date</Text>
                    </TouchableOpacity>


                    {/*<TouchableOpacity style={styles.dateButton} onPress={() => showMode('time')}>*/}
                    {/*    <Text>Pick Time</Text>*/}
                    {/*</TouchableOpacity>*/}

                    {show && (
                        <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                </View>
            )}
        </View>
    )

}

export default ManageExpense;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap"
    },

    textInput: {
        height: 35,
        width: 150,
        borderWidth: .75,
        color: "white",
        backgroundColor: "white",
        borderRadius: 6,
        paddingHorizontal: 10,
        margin: 15
    },

    dateButton: {
        height: 35,
        width: 150,
        borderRadius: 6,
        paddingHorizontal: 10,
        margin: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    dateText: {
        color: "white"
    },

    datePicker: {
        color: "white"
    }
});