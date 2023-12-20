import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Button, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
// import {useRoute} from "@react-navigation/native";
import {fetchExpenses, fetchExpense, storeExpense, updateExpense} from "../util/http";
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from "../util/datePicker";
import {ExpensesContext} from "../store/expenses-context";





function ManageExpense({route, navigation}) {
    const expensesCtx = useContext(ExpensesContext);


    // const route = useRoute();

    const expenseId = route.params?.id    // ? checks if params is defined, if not it wont move to id and returns undefined
    console.log("expenseId:", expenseId)
    const isEditable = !!expenseId       //If expenseId is truthy (i.e., it has a value other than undefined, null, 0, false, NaN, or an empty string),
                                            // then the first ! will turn it into false, and the second ! will turn that false back into true.


    // const [expenses, setExpenses] = useState([]);
    const [fetchedExpense, setFetchedExpense] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [formattedDate, setFormattedDate] = useState(new Date());
    // const expense = expenses.find((expense) => expense.id === expenseId)
    console.log("description:", description)
    console.log("amount:", amount)
    console.log("formattedDate:", formattedDate)
    const handleDateChange = (date) => {
        // This function is called from DatePicker, and it receives the formatted date
        setFormattedDate(date);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditable ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditable]);



    useEffect(() => {

        async function getSingleExpense() {
            if (isEditable && expenseId) {
                try {
                    const response = await fetchExpense(expenseId);
                    const singleExpense = response; // Assuming you are fetching a single expense
                    setFetchedExpense(singleExpense);
                    console.log("response:", response)

                    setDescription(singleExpense.description || '');
                    setAmount(singleExpense.amount || '');
                    setFormattedDate(new Date(singleExpense.date) || new Date());
                } catch (error) {
                    console.error('Error fetching single expense:', error);
                }
            }
        }
        getSingleExpense();
    }, [expenseId, isEditable]);



    const expenseData = {
        description,
        amount,
        date: formattedDate.toISOString()
    };

    function submitHandlerStore( expenseData){

            if (!expenseData.description) {
                alert('Description is empty !!')
            } else if (!expenseData.amount) {
                alert('Amount is empty !!')
            } else if (expenseData.amount && expenseData.description) {
                console.log('expenseData:', expenseData);

                storeExpense(expenseData)
                expensesCtx.addExpense(expenseData)
                navigation.goBack();
                console.log("storeExpense", expenseData)
                //try calling fetchExpenses
            }
    }
    function submitHandlerUpdate(expenseId, expenseData){

        console.log("expenseDataaaaaaaaaaaaaaaaaaaaaa", expenseData)
        if (!expenseData.description) {
            alert('Description is empty !!')
        } else if (!expenseData.amount) {
            alert('Amount is empty !!')
        } else if (expenseData.amount && expenseData.description) {
            console.log('expenseData:', expenseData);
            updateExpense(expenseId, expenseData)
            expensesCtx.updateExpense(expenseId, expenseData)
            navigation.goBack();

        }


    }



    return(
        <View>
            {!isEditable && (
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder={"Description"} onChangeText={ text => setDescription(text)} />
                    <TextInput style={styles.textInput} placeholder={"Amount"} onChangeText={ text => setAmount(text) } keyboardType={"number-pad"}/>
                    <View style={{marginVertical: 40}}>
                    <DatePicker onDateChange={handleDateChange} initialDate={formattedDate}/>
                    </View>
                    <View style={styles.submitButtonContainer}>
                        <TouchableOpacity style={styles.submitButton} onPress={() => {
                            submitHandlerStore(expenseData)
                        }}>
                            <Text style={{color: "white"}}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {isEditable &&(
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder={"Description"}  value={description} onChangeText={ text => setDescription(text)} />
                    <TextInput style={styles.textInput} placeholder={"Amount"}  value={amount.toString()} onChangeText={ text => setAmount(text) } keyboardType={"number-pad"}/>
                    <View style={{marginVertical: 40}}>
                        <DatePicker onDateChange={handleDateChange} initialDate={formattedDate}/>
                    </View>
                    <View style={styles.submitButtonContainer}>
                        <TouchableOpacity style={styles.submitButton} onPress={() => {
                            submitHandlerUpdate(expenseId, expenseData)
                        }}>
                            <Text style={{color: "white"}}>
                                Submit
                            </Text>
                        </TouchableOpacity>

                    </View>
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

    submitButton: {
        color: "white",
        height: 20,
        width: 70,
        alignItems: "center",
        justifyContent: "center"
    },

    submitButtonContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
    },

    textInput: {
        height: 35,
        width: 150,
        borderWidth: .75,
        color: "white",
        backgroundColor: "#696666",
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