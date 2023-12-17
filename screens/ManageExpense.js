import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text} from "react-native";
// import {useRoute} from "@react-navigation/native";
import {fetchExpenses} from "../util/http";



function ManageExpense({route, navigation}) {
    // const route = useRoute();

    const expenseId = route.params?.id    // ? checks if params is defined, if not it wont move to id and returns undefined
    console.log("expenseId:", expenseId)
    const isEditable = !!expenseId       //If expenseId is truthy (i.e., it has a value other than undefined, null, 0, false, NaN, or an empty string),
                                            // then the first ! will turn it into false, and the second ! will turn that false back into true.
    console.log("isEditable:", isEditable)

    const [expenses, setExpenses] = useState([]);
    const expense = expenses.find((expense) => expense.id === expenseId)


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

}

export default ManageExpense;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});